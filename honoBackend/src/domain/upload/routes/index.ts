import { createRoute } from "@hono/zod-openapi";
import {
  IssuePresignedUrlRequest,
  IssuePresignedUrlResponse,
  IssuePresignedUrlsRequest,
  IssuePresignedUrlsResponse,
} from "../models/dto";

export const issuePresignedUrlRoute = createRoute({
  method: "post",
  path: "/issue-presigned-url",
  tags: ["Upload"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: IssuePresignedUrlRequest.openapi("IssuePresignedUrlRequest"),
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Presigned URL issued successfully",
      content: {
        "application/json": {
          schema: IssuePresignedUrlResponse.openapi(
            "IssuePresignedUrlResponse"
          ),
        },
      },
    },
    "401": { description: "Unauthorized" },
    "500": { description: "Internal Server Error" },
  },
});

export const issuePresignedUrlsRoute = createRoute({
  method: "post",
  path: "/issue-presigned-url-bulk",
  tags: ["Upload"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: IssuePresignedUrlsRequest.openapi(
            "IssuePresignedUrlsRequest"
          ),
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Presigned URL issued successfully",
      content: {
        "application/json": {
          schema: IssuePresignedUrlsResponse.openapi(
            "IssuePresignedUrlsResponse"
          ),
        },
      },
    },
    "401": { description: "Unauthorized" },
    "500": { description: "Internal Server Error" },
  },
});
