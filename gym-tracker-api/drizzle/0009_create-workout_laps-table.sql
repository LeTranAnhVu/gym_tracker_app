CREATE TABLE IF NOT EXISTS "workout_laps" (
	"id" serial PRIMARY KEY NOT NULL,
	"workoutId" integer NOT NULL,
	"startTime" timestamp with time zone NOT NULL,
	"endTime" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_laps" ADD CONSTRAINT "workout_laps_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "public"."workouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "startTimeIndex" ON "workout_laps" USING btree ("startTime");