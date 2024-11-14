import { z } from "zod";
import { CategoryRequestType, CategoryResponseSchema } from "../../models/dto";
import {
  categoryRepository,
  CategoryRepository,
} from "../repositories/category.repository";

class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  //   async createCategory(category: Category): Promise<Category> {
  //     return this.categoryRepository.createCategory(category);
  //   }

  async getCategories(
    body: CategoryRequestType
  ): Promise<z.infer<typeof CategoryResponseSchema>> {
    return this.categoryRepository.getCategories(body);
  }

  //   async getCategoryById(id: string): Promise<Category> {
  //     return this.categoryRepository.getCategoryById(id);
  //   }

  //   async updateCategory(id: string, category: Category): Promise<Category> {
  //     return this.categoryRepository.updateCategory(id, category);
  //   }

  //   async deleteCategory(id: string): Promise<Category> {
  //     return this.categoryRepository.deleteCategory(id);
  //   }
}

export const categoryService = new CategoryService(categoryRepository);
