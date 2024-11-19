import { eq, and } from "drizzle-orm";
import { DB, db } from "../../../db/conncection";
import { companies, InsertCompany } from "../models/schema";

export class CompanyRepository {
  constructor(private readonly db: DB) {
    this.db = db;
  }

  async findExistingCompany(email: string) {
    return await this.db
      .select()
      .from(companies)
      .where(and(eq(companies.email, email), eq(companies.deleted, false)));
  }

  async createAndReturnCompany(companyData: InsertCompany) {
    return await db.insert(companies).values(companyData).returning();
  }

  async findCompanyById(id: number) {
    return db
      .select()
      .from(companies)
      .where(and(eq(companies.companyId, id), eq(companies.deleted, false)))
      .limit(1);
  }

  async findAllCompanies() {
    return db.select().from(companies).where(eq(companies.deleted, false));
  }

  async findCompanies({ page, size }: { page: number; size: number }) {
    return db
      .select()
      .from(companies)
      .where(eq(companies.deleted, false))
      .limit(size)
      .offset(size * (page - 1));
  }
  async countAllCompanies() {
    return (
      await db.select().from(companies).where(eq(companies.deleted, false))
    ).length;
  }
}

export const companyRepository = new CompanyRepository(db);
