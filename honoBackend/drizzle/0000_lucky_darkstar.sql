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


INSERT INTO public.companies (company_id, name, code, phone, email, zip_code, address, detail_address, deleted, created_at, created_by, deleted_at, deleted_by, last_modified_by, updated_at) 
VALUES
(1, 'Anchors', 'ANC', '010-3421-3305', 'user@example.com', '123', '23231', '1231231', 'f', '2024-11-03 23:55:56.062967', NULL, NULL, NULL, NULL, '2024-11-03 23:55:56.062967'),
(2, 'Dior', 'DIR', '010-3210-2312', 'dior@christaian.dloe', '12321', '214124', '1232132', 'f', '2024-11-03 23:55:56.062967', NULL, NULL, NULL, NULL, '2024-11-03 23:55:56.062967'),
(3, 'Chanel', 'CHA', '010-3210-2312', 'chanel@christaian.dloe', '12321', '214124', '1232132', 'f', '2022-11-07 15:37:09', NULL, NULL, NULL, NULL, '2024-11-03 23:55:56.062967'),
(4, 'Burberry', 'BUR', '010-3210-2312', 'burberry@bur.com', '12321', '214124', '1232132', 'f', '1978-08-18 00:30:31', NULL, NULL, NULL, NULL, '2024-11-03 23:55:56.062967');


INSERT INTO public.users (user_id, company_id, name, email, phone, zip_code, emp_no, password, role, auth, temp_password, address, detail_address, deleted, created_at, created_by, deleted_at, deleted_by, last_modified_by, updated_at) 
VALUES
(1, 1, 'Jinseok Seo', 'jsseo@anchors-biz.com', '010-321-2123', '1231', '1231', '$2b$10$pmRBVKhEQCLfob1SC2h6y.K6jruCZIakISZuBpSu9nAa9kjarwUai', 'SUPER_ADMIN', 'ALL', NULL, NULL, NULL, 'f', '2024-11-03 23:56:35.120099', NULL, NULL, NULL, NULL, '2024-11-03 23:56:35.120099'),
(2, 1, 'Jinseok Seo2', 'jinseok9338@gmail.com', '010-321-2123', '1231', '1231', '$2b$10$DqfZyz4m/tFxAXrtKqG1EuKewWPXjOPP65JR7PX3dIzXn1GdESc8G', 'USER', 'READ', NULL, NULL, NULL, 'f', '2024-11-04 00:13:28.911043', NULL, NULL, NULL, NULL, '2024-11-04 00:13:28.911043'),
(3, 1, 'Admin', 'admin@anchors-biz.com', '010-321-2123', '1231121', '1231121', '$2b$10$pmRBVKhEQCLfob1SC2h6y.K6jruCZIakISZuBpSu9nAa9kjarwUai', 'SUPER_ADMIN', 'ALL', NULL, NULL, NULL, 'f', '2024-11-04 00:13:28.911043', NULL, NULL, NULL, NULL, '2024-11-04 00:13:28.911043');
