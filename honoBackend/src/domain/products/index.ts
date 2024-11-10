import { OpenAPIHono } from "@hono/zod-openapi";
import { getProductsWithPagination } from "./routes";
import { productService } from "./products/services/products.service";

const ProductApp = new OpenAPIHono();

ProductApp.openapi(getProductsWithPagination, async (c) => {
  const sizeParams = c.req.valid("query").size;
  const pageParams = c.req.valid("query").page;
  const size = sizeParams ? parseInt(sizeParams) : 10;
  const page = pageParams ? parseInt(pageParams) : 0;

  const validatedResponse = await productService.listProducts(size, page);
  return c.json(validatedResponse, 200);
});

export default ProductApp;
