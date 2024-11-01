CREATE TYPE "public"."auth_levels" AS ENUM('ALL', 'READ');--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('SUPER_ADMIN', 'ADMIN', 'USER');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"zip_code" text,
	"emp_no" text,
	"password" text,
	"role" "user_roles" DEFAULT 'USER',
	"auth" "auth_levels" DEFAULT 'READ',
	"temp_password" text,
	"address" text,
	"detail_address" text,
	"deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" integer,
	"deleted_at" timestamp,
	"deleted_by" integer,
	"last_modified_by" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"company_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text,
	"phone" text,
	"email" text,
	"zip_code" text,
	"address" text,
	"detail_address" text,
	"deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" integer,
	"deleted_at" timestamp,
	"deleted_by" integer,
	"last_modified_by" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("company_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
