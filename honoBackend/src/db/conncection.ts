import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { companies } from "../domain/companies/models/schema";
import {
  companiesRelations,
  users,
  usersRelations,
} from "../domain/users/models/schema";
import { todos } from "../domain/todos/models/schema";

// Database connection configuration
export const schema = {
  companies,
  users,
  companiesRelations,
  usersRelations,
  todos,
} as const;

const host = process.env.DB_HOST ?? "localhost";
const port = parseInt(process.env.DB_PORT ?? "5432") ?? 5432;
const user = process.env.DB_USER ?? "postgres";
const password = process.env.DB_PASSWORD ?? "postgres";
const database = process.env.DB_DATABASE ?? "front_study_api_development";
const databaseUrl = `postgresql://${user}:${password}@${host}:${port}/${database}`;
const client = postgres(databaseUrl, {
  debug: true,
  idle_timeout: 60,
});
export const db = drizzle(client, { schema });
export type DB = typeof db;
