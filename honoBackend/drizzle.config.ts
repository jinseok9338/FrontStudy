import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    port: parseInt(process.env.DB_PORT ?? "5432") ?? 5432,
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_DATABASE ?? "front_study_api_development",
    host: process.env.DB_HOST ?? "localhost",
  },
} satisfies Config;
