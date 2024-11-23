import { appFactory } from "../../../utils/route";
import {
  deleteProductImageRoute,
  listAllProductImagesRoute,
  updateProductImageRoute,
} from "./routes";
import { productImageService } from "./services/productImage.service";

const ProductImageApp = appFactory();

ProductImageApp.openapi(updateProductImageRoute, async (c) => {
  const body = c.req.valid("json");

  await productImageService.updateProductImages(body);
  return c.json(
    {
      success: true,
    },
    200
  );
});

ProductImageApp.openapi(listAllProductImagesRoute, async (c) => {
  const productIdString = c.req.valid("param").id;
  const productId = parseInt(productIdString);
  const images = await productImageService.listAllProductImages(productId);
  return c.json(
    {
      images,
    },
    200
  );
});

ProductImageApp.openapi(deleteProductImageRoute, async (c) => {
  const productIdString = c.req.valid("param").id;
  const productId = parseInt(productIdString);
  await productImageService.deleteProductImage(productId);
  return c.json(
    {
      success: true,
    },
    200
  );
});

export default ProductImageApp;
