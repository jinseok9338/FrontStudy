import type { Config } from "drizzle-kit";
import * as path from "path";
import * as glob from "glob";
import "dotenv/config";

const schemaFiles = glob
  .sync(path.join(__dirname, "src/**/schema.ts"))
  .map((file) => path.relative(__dirname, file))
  .map((file) => "./" + file);

export default {
  schema: schemaFiles,
  out: "./drizzle",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    port: parseInt(process.env.DB_PORT ?? "5432") ?? 5432,
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_DATABASE ?? "front_study_api_development",
    host: process.env.DB_HOST ?? "localhost",
  },
} satisfies Config;
