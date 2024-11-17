import { OpenAPIHono } from "@hono/zod-openapi";
import { getCategoriesMenuRoute, getCategoriesRoute } from "./routes";
import { categoryService } from "./services/category.service";

const CategoryApp = new OpenAPIHono();

CategoryApp.openapi(getCategoriesRoute, async (c) => {
  const body = c.req.valid("query");
  const validatedResponse = await categoryService.getCategories(body);
  return c.json(validatedResponse, 200);
});

CategoryApp.openapi(getCategoriesMenuRoute, async (c) => {
  const validatedResponse = await categoryService.getCategoriesMenu();
  return c.json(validatedResponse, 200);
});

export default CategoryApp;
