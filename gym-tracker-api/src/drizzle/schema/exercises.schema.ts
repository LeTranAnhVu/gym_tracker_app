import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { users } from './users.schema'

export const exercises = pgTable('exercises', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 300 }),
    info: text('info'),
    createdBy: integer('createdBy').references(() => users.id)
})

export const exerciesRelations = relations(exercises, ({ one }) => ({
    creator: one(users, {
        fields: [exercises.createdBy],
        references: [users.id]
    })
}))

export type Exercise = typeof exercises.$inferSelect
export type InsertExercise = typeof exercises.$inferInsert
