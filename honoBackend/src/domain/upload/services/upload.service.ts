import {
  S3Client,
  CreateBucketCommand,
  PutBucketPolicyCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import "dotenv/config";
import path from "path";
import crypto from "crypto";
import { HTTPException } from "hono/http-exception";

class UploadService {
  private s3Client: S3Client;
  private endpoint: string;
  private bucket: string;

  constructor() {
    this.endpoint = `http://${process.env.MINIO_HOST ?? "localhost"}:${
      process.env.MINIO_PORT
    }`;
    this.bucket = process.env.MINIO_BUCKET || "uploads";
    // Initialize MinIO client
    this.s3Client = new S3Client({
      endpoint: this.endpoint,
      region: "us-east-1", // MinIO requires this but doesn't use it
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || "minioadmin",
        secretAccessKey: process.env.MINIO_SECRET_KEY || "minioadmin",
      },
      forcePathStyle: true, // Required for MinIO
    });
    this.initBucket();
  }

  private generateUniqueId(): string {
    return crypto.randomBytes(8).toString("hex");
  }

  private async initBucket() {
    try {
      const createBucketCommand = new CreateBucketCommand({
        Bucket: this.bucket,
      });
      await this.s3Client.send(createBucketCommand);
      const publicReadPolicy = {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `arn:aws:s3:::${this.bucket}/*`,
          },
        ],
      };

      // Apply the bucket policy
      const putBucketPolicyCommand = new PutBucketPolicyCommand({
        Bucket: this.bucket,
        Policy: JSON.stringify(publicReadPolicy),
      });
      await this.s3Client.send(putBucketPolicyCommand);
      console.log("Bucket created and policy applied");
    } catch (error: any) {
      // Ignore if bucket already exists
      if (
        error.name !== "BucketAlreadyOwnedByYou" &&
        error.name !== "BucketAlreadyExists"
      ) {
        throw error;
      }
    }
  }

  async issuePresignedUrl(fileName: string, fileType: string) {
    try {
      // Generate unique file path
      const uniqueId = this.generateUniqueId();
      const extension = path.extname(fileName);
      const filePath = `${uniqueId}${extension}`;

      // Create command for put object
      const putObjectCommand = new PutObjectCommand({
        Bucket: this.bucket,
        Key: filePath,
        ContentType: fileType,
        ACL: "public-read",
      });

      // Generate presigned URL with 10 minutes expiration
      const url = await getSignedUrl(this.s3Client, putObjectCommand, {
        expiresIn: 10 * 60, // 10 minutes in seconds
      });

      return {
        url,
        filePath,
      };
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error("Failed to generate upload URL");
    }
  }

  issuePresignedUrls(fileNames: string[]) {
    return Promise.all(
      fileNames.map((fileName) =>
        this.issuePresignedUrl(fileName, "image/jpeg")
      )
    );
  }
  async fileExists(filePath: string): Promise<boolean> {
    try {
      const bucket = process.env.MINIO_BUCKET || "uploads";
      const command = new HeadObjectCommand({
        Bucket: bucket,
        Key: filePath,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getValidatedPermanentUrl(filePath: string): Promise<string> {
    const exists = await this.fileExists(filePath);
    if (!exists) {
      throw new Error("File does not exist");
    }
    return this.getPermanentUrl(filePath);
  }

  getPermanentUrl(filePath: string): string {
    return `${this.endpoint}/${this.bucket}/${filePath}`;
  }

  getPermanentFilePathFileName(filePath: string): {
    fileName: string;
    filePath: string;
  } {
    const fileHost = `${this.endpoint}/${this.bucket}/`;
    return { fileName: filePath, filePath: fileHost };
  }

  getFileData(filePath: string) {
    return this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: filePath,
      })
    );
  }

  async getLongLivedUrl(filePath: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: filePath,
    });

    return await getSignedUrl(this.s3Client, command, {
      expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
    });
  }

  async deleteFile(filePath: string) {
    const bucket = process.env.MINIO_BUCKET || "uploads";
    const fileExists = await this.fileExists(filePath);
    if (!fileExists) {
      throw new HTTPException(404, { message: "File not found" });
    }
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: filePath,
        })
      );
      return true;
    } catch (error) {
      throw new HTTPException(500, { message: "Failed to delete file" });
    }
  }
}
export { UploadService };

export const uploadService = new UploadService();
