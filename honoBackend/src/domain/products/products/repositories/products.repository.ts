import { getTableColumns, sql } from "drizzle-orm";
import { db, DB } from "../../../../db/conncection";
import { categories, products } from "../../models/schema";
import { ProductSchema } from "../../models/dto";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export class ProductsRepository {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async findProducts(size: number, page: number) {
    const resposne = await this.db
      .select({
        ...getTableColumns(products),
      })
      .from(products)
      .leftJoin(
        categories,
        sql`${categories.categoryId} = ANY(${products.categories})`
      )
      .limit(size)
      .offset(size * page);
    console.log(resposne);
    const { success, data, error } = z.array(ProductSchema).safeParse(resposne);

    if (!success) {
      console.log(error);
      throw new HTTPException(404, {
        message: "Products not found",
      });
    }
    const total = (await this.db.select().from(products)).length;

    return {
      products: data,
      total,
    };
  }
}

export const productsRepository = new ProductsRepository(db);
