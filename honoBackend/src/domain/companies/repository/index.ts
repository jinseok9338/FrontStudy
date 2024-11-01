import { eq, and } from "drizzle-orm";
import { db } from "../../../db/conncection";
import { companies, InsertCompany } from "../models/schema";

export const findExistingCompany = async (email: string) => {
  return await db
    .select()
    .from(companies)
    .where(and(eq(companies.email, email), eq(companies.deleted, false)));
};

export const createComapny = async (companyData: InsertCompany) => {
  return await db.insert(companies).values(companyData).returning();
};

// Database query function
export async function findCompanyById(id: number) {
  return db
    .select()
    .from(companies)
    .where(and(eq(companies.companyId, id), eq(companies.deleted, false)))
    .limit(1);
}
