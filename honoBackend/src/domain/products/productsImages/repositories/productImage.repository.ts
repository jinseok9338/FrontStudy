import { eq, inArray } from "drizzle-orm";
import { DB, db } from "../../../../db/conncection";
import { productImages } from "../../models/schema";

class ProductImageRepository {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  getImagesByProductId = async (productId: number) => {
    return await this.db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .execute();
  };
}
export { ProductImageRepository };
export const productImageRepository = new ProductImageRepository(db);
