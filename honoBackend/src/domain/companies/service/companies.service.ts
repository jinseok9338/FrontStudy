import { z } from "zod";
import {
  companySchema,
  createCompanySchema,
  InsertCompany,
} from "../models/schema";
import {
  companyRepository,
  CompanyRepository,
} from "../repository/companies.repository";
import dayjs from "dayjs";
import { HTTPException } from "hono/http-exception";

export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  createCompany = async (company: z.infer<typeof createCompanySchema>) => {
    const existingCompany = await this.companyRepository.findExistingCompany(
      company.email
    );
    if (existingCompany.length > 0) {
      throw new HTTPException(409, {
        message: "Company with this email already exists",
      });
    }

    const companyData: InsertCompany = {
      ...company,
      createdBy: null,
      lastModifiedBy: null,
    };
    const [newCompany] = await this.companyRepository.createAndReturnCompany(
      companyData
    );
    const response = {
      ...newCompany,
      createdAt: dayjs(newCompany.createdAt).toDate(),
      updatedAt: dayjs(newCompany.updatedAt).toDate(),
      deletedAt: newCompany.deletedAt ? dayjs(newCompany.deletedAt) : null,
    };

    const validatedResponse = companySchema.parse(response);
    return validatedResponse;
  };

  getCompany = async (id: number) => {
    const [company] = await this.companyRepository.findCompanyById(id);
    if (!company) {
      throw new HTTPException(404, {
        message: "Company not found",
      });
    }
    const response = {
      ...company,
      createdAt: dayjs(company.createdAt).toDate(),
      updatedAt: dayjs(company.updatedAt).toDate(),
      deletedAt: company.deletedAt ? dayjs(company.deletedAt).toDate() : null,
    };
    const validatedResponse = companySchema.parse(response);
    return validatedResponse;
  };
}

export const companyService = new CompanyService(companyRepository);
