import { z } from "zod";
import { GetProductsWithPaginationResponseSchema } from "../../models/dto";
import {
  productsRepository,
  ProductsRepository,
} from "../repositories/products.repository";
import { HTTPException } from "hono/http-exception";
import { products } from "../../models/schema";

export class ProductService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async listProducts(
    size: number,
    page: number,
    condition: {
      name?: string;
      sku?: string;
      barcode?: string;
      colorCode?: string;
      categoryOne?: string;
      categoryTwo?: string;
      categoryThree?: string;
    }
  ): Promise<
    z.infer<
      (typeof GetProductsWithPaginationResponseSchema)["200"]["content"]["application/json"]["schema"]
    >
  > {
    if (size <= 0 || page <= 0) {
      throw new HTTPException(400, {
        message: "Size and page must be positive integers",
      });
    }

    const { products, total } = await this.productRepository.findAdminProducts(
      size,
      page - 1,
      condition
    );
    const hasMore = total > page * size;

    return {
      products: products,
      total,
      hasMore,
      page,
      size,
    };
  }

  async listUserProducts(
    size: number,
    page: number,
    condition: {
      name?: string;
      sku?: string;
      barcode?: string;
      colorCode?: string;
      categoryOne?: string;
      categoryTwo?: string;
      categoryThree?: string;
    }
  ): Promise<
    z.infer<
      (typeof GetProductsWithPaginationResponseSchema)["200"]["content"]["application/json"]["schema"]
    >
  > {
    if (size <= 0 || page <= 0) {
      throw new HTTPException(400, {
        message: "Size and page must be positive integers",
      });
    }

    const { products, total } = await this.productRepository.findUserProducts(
      size,
      page - 1,
      condition
    );
    const hasMore = total > page * size;

    return {
      products: products,
      total,
      hasMore,
      page,
      size,
    };
  }

  async createProduct(
    product: typeof products.$inferInsert
  ): Promise<typeof products.$inferSelect> {
    return await this.productRepository.createProduct(product);
  }

  async updateProduct(
    id: string,
    product: typeof products.$inferInsert
  ): Promise<typeof products.$inferSelect> {
    return await this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string): Promise<void> {
    return await this.productRepository.deleteProduct(id);
  }

  async getProductById(id: string): Promise<typeof products.$inferSelect> {
    return await this.productRepository.getProductById(id);
  }
}

export const productService = new ProductService(productsRepository);
