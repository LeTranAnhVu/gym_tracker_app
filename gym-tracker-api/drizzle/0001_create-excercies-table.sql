CREATE TABLE IF NOT EXISTS "excercies" (
	"id" serial PRIMARY KEY NOT NULL,
	"info" text,
	"createdBy" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "excercies" ADD CONSTRAINT "excercies_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
