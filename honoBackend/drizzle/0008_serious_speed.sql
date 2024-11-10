ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_category_id_categories_category_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "categories" integer[] DEFAULT "{}";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "category_id";