import { appFactory } from "../../../utils/route";
import { updateProductImageRoute } from "./routes";
import { productImageService } from "./services/productImage.service";

const ProductImageApp = appFactory();
ProductImageApp.openapi(updateProductImageRoute, async (c) => {
  const body = c.req.valid("json");

  const validatedResponse = await productImageService.updateProductImages(body);
  return c.json(validatedResponse, 200);
});

export default ProductImageApp;
