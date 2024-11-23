import {
  productService,
  ProductService,
} from "../../products/services/products.service";
import {
  productImageRepository,
  ProductImageRepository,
} from "../repositories/productImage.repository";

class ProductImaeServie {
  private productImageRepository: ProductImageRepository;
  private productService: ProductService;

  constructor(
    productImageRepository: ProductImageRepository,
    productService: ProductService
  ) {
    this.productImageRepository = productImageRepository;
    this.productService = productService;
  }

  async updateProductImages({
    images,
  }: {
    images: {
      productId: number;
      filePath: string;
      order: number;
    }[];
  }) {
    return this.productImageRepository.updateProductImages(images);
  }
}

export const productImageService = new ProductImaeServie(
  productImageRepository,
  productService
);
