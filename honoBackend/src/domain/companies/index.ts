import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  companies,
  companyIdSchema,
  companySchema,
  createCompanySchema,
  InsertCompany,
} from "./models/schema";
import { HTTPException } from "hono/http-exception";
import { db } from "../../db/conncection";
import { and, eq } from "drizzle-orm";
import { createConapnyRoute, getCompanyByIdRoute } from "./routes";
import {
  createComapny as createAndReturnComapny,
  findCompanyById,
  findExistingCompany,
} from "./repository";
import dayjs from "dayjs";
import { ErrorBuilder } from "../../error";

const CompanyApp = new OpenAPIHono();

// path "/", method POST
CompanyApp.openapi(createConapnyRoute, async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = createCompanySchema.parse(body);
    if (validatedData.email) {
      const existingCompany = await findExistingCompany(validatedData.email);
      if (existingCompany.length > 0) {
        throw new HTTPException(409, {
          message: "Company with this email already exists",
        });
      }
    }
    const companyData: InsertCompany = {
      ...validatedData,
      createdBy: null,
      lastModifiedBy: null,
    };
    const [newCompany] = await createAndReturnComapny(companyData);
    const response = {
      ...newCompany,
      createdAt: dayjs(newCompany.createdAt).toDate(),
      updatedAt: dayjs(newCompany.updatedAt).toDate(),
      deletedAt: newCompany.deletedAt ? dayjs(newCompany.deletedAt) : null,
    };

    const validatedResponse = companySchema.parse(response);
    return c.json(validatedResponse, 200);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

CompanyApp.openapi(getCompanyByIdRoute, async (c) => {
  try {
    const id = parseInt(c.req.valid("param").id);
    const [company] = await findCompanyById(id);
    if (!company) {
      throw new HTTPException(404, {
        message: "Company not found",
      });
    }
    const response = {
      ...company,
      createdAt: dayjs(company.createdAt).toDate(),
      updatedAt: dayjs(company.updatedAt).toDate(),
      deletedAt: company.deletedAt ? dayjs(company.deletedAt).toDate() : null,
    };
    const validatedResponse = companySchema.parse(response);

    return c.json(validatedResponse, 200);
  } catch (error) {
    return ErrorBuilder(error);
  }
});

export default CompanyApp;
