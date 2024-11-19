import { createRoute, z } from "@hono/zod-openapi";
import {
  createCompanySchema,
  companySchema,
  companyIdSchema,
} from "../models/schema";
import { GetCompaniesWithPaginationResponseSchema } from "../models/dto";
import {
  QuerySchema,
  QuerySchemaWithOption,
} from "../../todos/models/dtoShema";

export const createConapnyRoute = createRoute({
  path: "/",
  method: "post",
  tags: ["Companies"],
  description: "Company Creation",
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createCompanySchema.openapi("CreateCompanyRequest"),
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Company created successfully",
      content: {
        "application/json": {
          schema: companySchema.openapi("Company"),
        },
      },
    },
    "400": {
      description: "Invalid input data",
    },
    "409": {
      description: "Company with this email already exists",
    },
    "500": {
      description: "Internal server error",
    },
  },
});

// Define the route configuration
export const getCompanyByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["Companies"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description: "Retrieve company by ID",
  request: {
    params: companyIdSchema,
  },
  responses: {
    200: {
      description: "Company retrieved successfully",
      content: {
        "application/json": {
          schema: companySchema,
        },
      },
    },
    404: {
      description: "Company not found",
    },
    400: {
      description: "Invalid company ID",
    },
    500: {
      description: "Internal server error",
    },
  },
});

export const getCompaniesRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Companies"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  description:
    "Retrieve companies With Pagination page, size 둘다 넣지 않으면 전체 회사 조회",
  request: QuerySchemaWithOption,
  responses: {
    ...GetCompaniesWithPaginationResponseSchema,

    500: {
      description: "Internal server error",
    },
  },
});
