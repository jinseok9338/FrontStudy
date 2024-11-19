import { OpenAPIHono } from "@hono/zod-openapi";

import {
  createConapnyRoute,
  getCompaniesRoute,
  getCompanyByIdRoute,
} from "./routes";

import { ErrorBuilder } from "../../error";

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

CompanyApp.openapi(getCompaniesRoute, async (c) => {
  const page = c.req.valid("query").page;
  const size = c.req.valid("query").size;
  const pageInt = page ? parseInt(page) : undefined;
  const sizeInt = size ? parseInt(size) : undefined;

  try {
    const validatedResponse = await companyService.getCompanies(
      pageInt,
      sizeInt
    );
    return c.json(validatedResponse, 200);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

export default CompanyApp;
