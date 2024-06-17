import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'
import { users } from './users.schema'

export const excercies = pgTable('excercies', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 300 }),
    info: text('info'),
    createdBy: integer('createdBy').references(() => users.id)
})

export const excerciesRelations = relations(excercies, ({ one }) => ({
    creator: one(users, {
        fields: [excercies.createdBy],
        references: [users.id]
    })
}))

export type Excercise = typeof excercies.$inferSelect
export type InsertExcercise = typeof excercies.$inferInsert
