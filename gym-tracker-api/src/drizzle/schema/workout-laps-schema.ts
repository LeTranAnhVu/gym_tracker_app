import { index, integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core'
import { workouts } from './workouts.schema'
import { relations } from 'drizzle-orm'

export const workoutLaps = pgTable(
    'workout_laps',
    {
        id: serial('id').primaryKey(),
        workoutId: integer('workoutId')
            .notNull()
            .references(() => workouts.id, { onDelete: 'cascade' }),
        startTime: timestamp('startTime', { withTimezone: true }).notNull(),
        endTime: timestamp('endTime', { withTimezone: true })
    },
    (table) => {
        return {
            startTimeIndex: index('startTimeIndex').on(table.startTime)
        }
    }
)

export const workoutLapsRelations = relations(workoutLaps, ({ one }) => ({
    workout: one(workouts)
}))

export type WorkoutLap = typeof workoutLaps.$inferSelect
export type InsertWorkoutLap = typeof workoutLaps.$inferInsert
