import { z } from "zod";
import { GetProductsWithPaginationResponseSchema } from "../../models/dto";
import {
  productsRepository,
  ProductsRepository,
} from "../repositories/products.repository";
import { HTTPException } from "hono/http-exception";

export class ProductService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async listProducts(
    size: number,
    page: number
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

    const { products, total } = await this.productRepository.findProducts(
      size,
      page - 1
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

  // async getProductById(id: string): Promise<Product> {
  //     return await this.productRepository.getProductById(id);
  // }

  // async createProduct(product: Product): Promise<Product> {
  //     return await this.productRepository.createProduct(product);
  // }

  // async updateProduct(id: string, product: Product): Promise<Product> {
  //     return await this.productRepository.updateProduct(id, product);
  // }

  // async deleteProduct(id: string): Promise<void> {
  //     return await this.productRepository.deleteProduct(id);
  // }
}

export const productService = new ProductService(productsRepository);
