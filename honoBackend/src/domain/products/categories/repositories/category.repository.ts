import { HTTPException } from "hono/http-exception";
import { db, DB } from "../../../../db/conncection";
import { CategoryRequestType } from "../../models/dto";
import { categories } from "../../models/schema";
import { eq } from "drizzle-orm";

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
}

export { CategoryRepository };
export const categoryRepository = new CategoryRepository(db);
