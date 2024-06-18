import {
    decimal,
    integer,
    pgTable,
    serial,
    smallint,
    text,
    timestamp,
    varchar
} from 'drizzle-orm/pg-core'
import { workouts } from './workouts.schema'
import { exercises } from './exercises.schema'

export const exerciseSets = pgTable('exerciseSets', {
    id: serial('id').primaryKey(),
    workoutId: integer('workoutId')
        .notNull()
        .references(() => workouts.id, { onDelete: 'cascade' }),
    exerciseId: integer('exerciseId')
        .notNull()
        .references(() => exercises.id),
    customName: varchar('customName', { length: 400 }),
    weight: decimal('weight', { precision: 4, scale: 1 }),
    reps: smallint('reps'),
    note: text('note'),
    createdAt: timestamp('createdAt').defaultNow()
})

export type ExerciseSet = typeof exerciseSets.$inferSelect
export type InsertExerciseSet = typeof exerciseSets.$inferInsert
