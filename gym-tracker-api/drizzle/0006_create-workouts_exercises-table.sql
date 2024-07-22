CREATE TABLE IF NOT EXISTS "workouts_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"workoutId" integer NOT NULL,
	"exerciseId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts_exercises" ADD CONSTRAINT "workouts_exercises_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "public"."workouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts_exercises" ADD CONSTRAINT "workouts_exercises_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
