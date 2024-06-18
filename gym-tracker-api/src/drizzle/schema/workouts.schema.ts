import {
    integer,
    pgTable,
    serial,
    timestamp,
    varchar
} from 'drizzle-orm/pg-core'
import { users } from './users.schema'

export const workouts = pgTable('workouts', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 300 }),
    createdAt: timestamp('createdAt', { withTimezone: true }),
    createdBy: integer('createdBy')
        .notNull()
        .references(() => users.id)
})

export type Workout = typeof workouts.$inferSelect
export type InsertWorkout = typeof workouts.$inferInsert
