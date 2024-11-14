import { OpenAPIHono } from "@hono/zod-openapi";
import { getCategoriesRoute } from "./routes";
import { categoryService } from "./services/category.service";

const CategoryApp = new OpenAPIHono();

CategoryApp.openapi(getCategoriesRoute, async (c) => {
  const body = c.req.valid("query");
  const validatedResponse = await categoryService.getCategories(body);
  return c.json(validatedResponse, 200);
});

export default CategoryApp;
