import { HTTPException } from "hono/http-exception";
import { db, DB } from "../../../../db/conncection";
import {
  CategoryMenuResponseSchema,
  CategoryRequestType,
  CategoryResponseSchema,
  CategorySchema,
} from "../../models/dto";
import { categories } from "../../models/schema";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

class CategoryRepository {
  private db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  getCategories = async (body: CategoryRequestType) => {
    if (!body.depthOne) {
      const depthOneCategories = await this.db
        .select()
        .from(categories)
        .where(eq(categories.depth, 0))
        .execute();
      return {
        depthOne: depthOneCategories,
        depthTwo: [],
        depthThree: [],
      };
    }

    if (body.depthOne && !body.depthTwo) {
      if (!body.depthOne) {
        throw new HTTPException(400, {
          message: "DepthOne is required",
        });
      }
      const depthOneCategories = await this.db
        .select()
        .from(categories)
        .where(eq(categories.categoryId, parseInt(body.depthOne)))
        .execute();
      const depthTwoCategories = await this.db
        .select()
        .from(categories)
        .where(eq(categories.parentId, parseInt(body.depthOne)))
        .execute();
      return {
        depthOne: depthOneCategories,
        depthTwo: depthTwoCategories,
        depthThree: [],
      };
    }

    if (body.depthOne && body.depthTwo) {
      const depthOneCategories = await this.db
        .select()
        .from(categories)
        .where(eq(categories.categoryId, parseInt(body.depthOne)))
        .execute();
      const depthTwoCategories = await this.db
        .select()
        .from(categories)
        .where(eq(categories.categoryId, parseInt(body.depthTwo)))
        .execute();
      const depthThreeCategories = await this.db
        .select()
        .from(categories)
        .where(eq(categories.parentId, parseInt(body.depthTwo)))
        .execute();
      return {
        depthOne: depthOneCategories,
        depthTwo: depthTwoCategories,
        depthThree: depthThreeCategories,
      };
    }
    return {
      depthOne: [],
      depthTwo: [],
      depthThree: [],
    };
  };

  getCategoryByName = async (name: string) => {
    const [category] = await this.db
      .select()
      .from(categories)
      .where(eq(categories.name, name));
    const { data, success } = CategorySchema.safeParse(category);
    if (!success) {
      throw new HTTPException(404, {
        message: "Category not found",
      });
    }

    return data;
  };

  getCategoryById = async (id: number) => {
    const [category] = await this.db
      .select()
      .from(categories)
      .where(eq(categories.categoryId, id));
    const { data, success } = CategorySchema.safeParse(category);
    if (!success) {
      throw new HTTPException(404, {
        message: "Category not found",
      });
    }

    return data;
  };
  getCategoriesByIds = async (ids: number[]) => {
    const categoriesResponse = await this.db
      .select()
      .from(categories)
      .where(inArray(categories.categoryId, ids))
      .execute();

    return categoriesResponse;
  };

  getCategoriesMenu = async (): Promise<
    z.infer<typeof CategoryMenuResponseSchema>
  > => {
    // Fetch top-level categories (depth = 0)
    const categoriesMenu = await this.db
      .select()
      .from(categories)
      .where(eq(categories.depth, 0))
      .execute();

    // Function to recursively fetch children
    const getChildren = async (categoryId: number): Promise<any[]> => {
      const children = await this.db
        .select()
        .from(categories)
        .where(eq(categories.parentId, categoryId))
        .execute();

      if (children.length === 0) {
        return []; // No children, return empty array
      }

      // For each child, recursively fetch their children
      const childrenWithGrandChildren = await Promise.all(
        children.map(async (child) => ({
          ...child,
          children: await getChildren(child.categoryId), // Recursively fetch children
        }))
      );

      return childrenWithGrandChildren;
    };

    // Build the full category tree with children
    const categoriesWithChildren = await Promise.all(
      categoriesMenu.map(async (category) => {
        const children = await getChildren(category.categoryId); // Get children for each category
        return {
          ...category,
          children,
        };
      })
    );

    return { categoryMenu: categoriesWithChildren };
  };
}

export { CategoryRepository };
export const categoryRepository = new CategoryRepository(db);
