CREATE TABLE IF NOT EXISTS "exerciseSets" (
	"id" serial PRIMARY KEY NOT NULL,
	"workoutId" integer NOT NULL,
	"exerciseId" integer NOT NULL,
	"customName" varchar(400),
	"weight" numeric(4, 1),
	"reps" smallint,
	"note" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exerciseSets" ADD CONSTRAINT "exerciseSets_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "public"."workouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exerciseSets" ADD CONSTRAINT "exerciseSets_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
