import { appFactory } from "../../utils/route";
import { issuePresignedUrlRoute, issuePresignedUrlsRoute } from "./routes";
import { uploadService } from "./services/upload.service";

const UploadApp = appFactory();

UploadApp.openapi(issuePresignedUrlRoute, async (c) => {
  const body = c.req.valid("json");
  const { fileName, fileType } = body;
  const validatedResponse = await uploadService.issuePresignedUrl(
    fileName,
    fileType
  );
  return c.json(validatedResponse, 200);
});

UploadApp.openapi(issuePresignedUrlsRoute, async (c) => {
  const body = c.req.valid("json");
  const { fileNames } = body;
  const validatedResponse = await uploadService.issuePresignedUrls(fileNames);
  return c.json(validatedResponse, 200);
});

export default UploadApp;
