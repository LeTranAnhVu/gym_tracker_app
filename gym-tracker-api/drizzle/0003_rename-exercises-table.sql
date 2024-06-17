ALTER TABLE "excercies" RENAME TO "exercises";--> statement-breakpoint
ALTER TABLE "exercises" DROP CONSTRAINT "excercies_createdBy_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
