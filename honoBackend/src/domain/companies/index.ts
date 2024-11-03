import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  companySchema,
  createCompanySchema,
  InsertCompany,
} from "./models/schema";
import { HTTPException } from "hono/http-exception";
import { createConapnyRoute, getCompanyByIdRoute } from "./routes";
import dayjs from "dayjs";
import { ErrorBuilder } from "../../error";
import { companyRepository } from "./repository/companies.repository";
import { companyService } from "./service/companies.service";

const CompanyApp = new OpenAPIHono();
CompanyApp.openapi(createConapnyRoute, async (c) => {
  const body = c.req.valid("json");
  try {
    const validatedResponse = await companyService.createCompany(body);
    return c.json(validatedResponse, 200);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

CompanyApp.openapi(getCompanyByIdRoute, async (c) => {
  const id = parseInt(c.req.valid("param").id);
  try {
    const validatedResponse = await companyService.getCompany(id);
    return c.json(validatedResponse, 200);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

export default CompanyApp;