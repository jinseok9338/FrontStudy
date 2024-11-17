import { z } from "zod";
import {
  CategoryMenuResponseSchema,
  CategoryRequestType,
  CategoryResponseSchema,
  CategorySchema,
} from "../../models/dto";
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

  async getCategoryById(id: number): Promise<z.infer<typeof CategorySchema>> {
    return this.categoryRepository.getCategoryById(id);
  }

  async getCategoriesMenu(): Promise<
    z.infer<typeof CategoryMenuResponseSchema>
  > {
    const response = await this.categoryRepository.getCategoriesMenu();
    // I want to print the catergories menu  with only name and categoryId
    // const getChildren = (children: any) => {
    //   return children.map((child: any) => {
    //     return {
    //       name: child.name,
    //       categoryId: child.categoryId,
    //       children: getChildren(child.children),
    //     };
    //   });
    // };
    // const categories = response.categoryMenu.map((category) => {
    //   return {
    //     name: category.name,
    //     categoryId: category.categoryId,
    //     children: getChildren(category.children),
    //   };
    // });
    // console.dir(categories, {
    //   depth: Infinity,
    // });
    return response;
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
