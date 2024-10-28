import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Database connection configuration
const host = process.env.DB_HOST ?? "localhost";
const port = parseInt(process.env.DB_PORT ?? "5432") ?? 5432;
const user = process.env.DB_USER ?? "postgres";
const password = process.env.DB_PASSWORD ?? "postgres";
const database = process.env.DB_DATABASE ?? "front_study_api_development";
const client = postgres({
  host,
  port,
  user,
  password,
  database,
});
export const db = drizzle(client, { schema });
