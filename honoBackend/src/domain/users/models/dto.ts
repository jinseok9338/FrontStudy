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
