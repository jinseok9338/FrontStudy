import { z } from "zod";
import { UserResponseSchema } from "./schema";

export const GetUsersWithPaginationResponseSchema = {
  200: {
    description: "Fetch paginated list of Users",
    content: {
      "application/json": {
        schema: z.object({
          users: z.array(UserResponseSchema),
          total: z.number(),
          hasMore: z.boolean(),
          page: z.number(),
          size: z.number(),
        }),
      },
    },
  },
};

export const UserQuerySchema = {
  query: z.object({
    size: z.string().optional().default("10"),
    page: z.string().optional().default("0"),
    name: z.string().optional(),
    empNo: z.string().optional(),
    email: z.string().optional(),
  }),
};
