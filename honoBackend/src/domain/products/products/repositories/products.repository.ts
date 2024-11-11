import { eq, getTableColumns, sql } from "drizzle-orm";
import { db, DB } from "../../../../db/conncection";
import { categories, productImages, products } from "../../models/schema";
import { ProductSchema, ProductImageSchema } from "../../models/dto";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { get } from "http";

export class ProductsRepository {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async findProducts(size: number, page: number) {
    const resposne = await this.db
      .select({
        ...getTableColumns(products),
        images: productImages,
      })
      .from(products)
      .leftJoin(
        categories,
        sql`${categories.categoryId} = ANY(${products.categories})`
      )
      .leftJoin(productImages, eq(productImages.productId, products.productId))
      .limit(size)
      .offset(size * page);

    const productsWithImages = resposne.reduce((acc: any[], product: any) => {
      let existingProduct = acc.find((p) => p.productId === product.productId);

      if (!existingProduct) {
        existingProduct = {
          ...product,
          images: [],
        };
        acc.push(existingProduct);
      }

      if (product.images) {
        existingProduct?.images?.push(product.images);
      }

      return acc;
    }, []);

    const { success, data, error } = z
      .array(ProductSchema)
      .safeParse(productsWithImages);

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

  async createProduct(
    product: typeof products.$inferInsert
  ): Promise<typeof products.$inferSelect> {
    const [createdProduct] = await this.db
      .insert(products)
      .values(product)
      .returning()
      .execute();
    return createdProduct;
  }
  async updateProduct(id: string, product: typeof products.$inferInsert) {
    const [updatedProduct] = await this.db
      .update(products)
      .set(product)
      .where(eq(products.productId, Number(id)))
      .returning()
      .execute();

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    await this.db
      .delete(products)
      .where(eq(products.productId, Number(id)))
      .execute();
  }

  async getProductById(id: string) {
    const response = await this.db
      .select({
        ...getTableColumns(products),
        images: productImages,
      })
      .from(products)
      .where(eq(products.productId, Number(id)))
      .leftJoin(
        categories,
        sql`${categories.categoryId} = ANY(${products.categories})`
      )
      .leftJoin(productImages, eq(productImages.productId, products.productId));

    const [productsWithImages] = response.reduce((acc: any[], product: any) => {
      let existingProduct = acc.find((p) => p.productId === product.productId);

      if (!existingProduct) {
        existingProduct = {
          ...product,
          images: [],
        };
        acc.push(existingProduct);
      }

      if (product.images) {
        existingProduct?.images?.push(product.images);
      }

      return acc;
    }, []);

    return productsWithImages;
  }
}

export const productsRepository = new ProductsRepository(db);
