import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { workouts } from './workouts.schema'
import { exercises } from './exercises.schema'
import { relations } from 'drizzle-orm'

export const workoutsExercises = pgTable('workouts_exercises', {
    id: serial('id').primaryKey(),
    workoutId: integer('workoutId')
        .notNull()
        .references(() => workouts.id, { onDelete: 'cascade' }),
    exerciseId: integer('exerciseId')
        .notNull()
        .references(() => exercises.id, { onDelete: 'cascade' }),
    createdAt: timestamp('createdAt').defaultNow()
})

export const workoutsExercisesRelations = relations(
    workoutsExercises,
    ({ one }) => ({
        workout: one(workouts, {
            fields: [workoutsExercises.workoutId],
            references: [workouts.id]
        }),
        exercise: one(exercises, {
            fields: [workoutsExercises.exerciseId],
            references: [exercises.id]
        })
    })
)

export type WorkoutExercise = typeof workoutsExercises.$inferSelect
export type InsertWorkoutExercise = typeof workoutsExercises.$inferInsert
