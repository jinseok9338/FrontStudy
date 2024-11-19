import { z } from "zod";
import { companySchema } from "./schema";

export const GetCompaniesWithPaginationResponseSchema = {
  200: {
    description: "Fetch paginated list of Users",
    content: {
      "application/json": {
        schema: z.object({
          companies: z.array(companySchema),
          total: z.number(),
          hasMore: z.boolean(),
          page: z.number(),
          size: z.number(),
        }),
      },
    },
  },
};
