ALTER TABLE "exerciseSets" RENAME TO "exercise_sets";--> statement-breakpoint
ALTER TABLE "exercise_sets" DROP CONSTRAINT "exerciseSets_workoutId_workouts_id_fk";
--> statement-breakpoint
ALTER TABLE "exercise_sets" DROP CONSTRAINT "exerciseSets_exerciseId_exercises_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_workoutId_workouts_id_fk" FOREIGN KEY ("workoutId") REFERENCES "public"."workouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_exerciseId_exercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
