import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export const ErrorBuilder = (error: unknown) => {
  console.log(error);
  if (error instanceof z.ZodError) {
    throw new HTTPException(400, {
      message: error.message,
    });
  }

  if (error instanceof HTTPException) {
    throw new HTTPException(error.status, {
      message: error.message,
    });
  }

  throw new HTTPException(500, {
    message: "Internal server error",
  });
};
