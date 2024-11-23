import { eq, inArray, and } from "drizzle-orm";
import { DB, db } from "../../../../db/conncection";
import { productImages } from "../../models/schema";
import {
  uploadService,
  UploadService,
} from "../../../upload/services/upload.service";
import { HTTPException } from "hono/http-exception";

class ProductImageRepository {
  private db: DB;
  private uploadService: UploadService;

  constructor(db: DB, uploadService: UploadService) {
    this.db = db;
    this.uploadService = uploadService;
  }

  getImagesByProductsId = async (productId: number) => {
    return await this.db
      .select()
      .from(productImages)
      .where(
        and(
          eq(productImages.productId, productId),
          eq(productImages.deleted, false)
        )
      )
      .execute();
  };

  private imageExists = async (productId: number, filePath: string) => {
    const existingImage = await this.db
      .select()
      .from(productImages)
      .where(
        and(
          eq(productImages.productId, productId),
          eq(productImages.fileName, filePath)
        )
      )
      .execute();
    return existingImage.length > 0;
  };

  private updateOrder = async (
    productId: number,
    filePath: string,
    order: number
  ) => {
    await this.db
      .update(productImages)
      .set({ order: order })
      .where(
        and(
          eq(productImages.productId, productId),
          eq(productImages.filePath, filePath)
        )
      )
      .execute();
  };

  listAllImagesByProductId = async (productId: number) => {
    return await this.db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .execute();
  };

  createProductImage = async (
    productId: number,
    filePath: string,
    order: number
  ) => {
    const imageExists = await this.uploadService.fileExists(filePath);
    if (!imageExists) {
      throw new HTTPException(404, { message: `${filePath} not found` });
    }
    const { fileName, filePath: bucketFilePath } =
      this.uploadService.getPermanentFilePathFileName(filePath);
    const file = await this.uploadService.getFileData(filePath);
    const fileType = file.ContentType ?? "unknown";
    const fileSize = file.ContentLength ?? 0;
    const extension = fileName.split(".").pop() ?? "unknown";
    const oriFileName = ""; // temp
    const deleted = false;
    const createdAt = new Date();
    const updatedAt = new Date();

    await this.db
      .insert(productImages)
      .values({
        productId,
        filePath: bucketFilePath,
        order,
        fileName,
        fileType,
        fileSize,
        extension,
        oriFileName,
        deleted,
        createdAt,
        updatedAt,
      })
      .execute();
  };

  updateProductImages = async (
    images: {
      productId: number;
      filePath: string;
      order: number;
    }[]
  ) => {
    for (const image of images) {
      const imageExists = await this.imageExists(
        image.productId,
        image.filePath
      );
      if (imageExists) {
        await this.updateOrder(image.productId, image.filePath, image.order);
      } else {
        await this.createProductImage(
          image.productId,
          image.filePath,
          image.order
        );
      }
    }
    return true;
  };
}

export { ProductImageRepository };
export const productImageRepository = new ProductImageRepository(
  db,
  uploadService
);
