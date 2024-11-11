import { OpenAPIHono } from "@hono/zod-openapi";
import {
  createProductRoute,
  deleteProductRoute,
  getProductByIdRoute,
  getProductsWithPagination,
  updateProductRoute,
} from "./routes";
import { productService } from "./products/services/products.service";
import { ErrorBuilder } from "../../error";

const ProductApp = new OpenAPIHono();

ProductApp.openapi(getProductsWithPagination, async (c) => {
  const { size: sizeParams, page: pageParams, ...rest } = c.req.valid("query");
  const size = sizeParams ? parseInt(sizeParams) : 10;
  const page = pageParams ? parseInt(pageParams) : 0;
  const validatedResponse = await productService.listProducts(size, page, rest);
  return c.json(validatedResponse, 200);
});

ProductApp.openapi(createProductRoute, async (c) => {
  try {
    const body = c.req.valid("json");
    const validatedResponse = await productService.createProduct(body);
    return c.json(validatedResponse, 201);
  } catch (error) {
    console.log(error);
    return ErrorBuilder(error);
  }
});

ProductApp.openapi(updateProductRoute, async (c) => {
  try {
    const body = c.req.valid("json");
    const id = c.req.valid("param").id;
    const validatedResponse = await productService.updateProduct(id, body);
    return c.json(validatedResponse, 200);
  } catch (error) {
    console.log(error);
    return ErrorBuilder(error);
  }
});

ProductApp.openapi(deleteProductRoute, async (c) => {
  try {
    const id = c.req.valid("param").id;
    await productService.deleteProduct(id);
    return c.json({ message: "Product deleted" }, 200);
  } catch (error) {
    console.log(error);
    return ErrorBuilder(error);
  }
});

ProductApp.openapi(getProductByIdRoute, async (c) => {
  try {
    const id = c.req.valid("param").id;
    const response = await productService.getProductById(id);
    return c.json(response, 200);
  } catch (error) {
    console.log(error);
    return ErrorBuilder(error);
  }
});

export default ProductApp;
