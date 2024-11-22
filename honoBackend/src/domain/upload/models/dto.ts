import { z } from "zod";

export const IssuePresignedUrlRequest = z.object({
  fileName: z.string(),
  fileType: z.string(),
});

export const IssuePresignedUrlsRequest = z.object({
  fileNames: z.array(z.string()),
});

export const IssuePresignedUrlResponse = z.object({
  fileName: z.string(),
  fileType: z.string(),
});

export const IssuePresignedUrlsResponse = z.array(
  z.object({
    fileName: z.string(),
    fileType: z.string(),
  })
);
