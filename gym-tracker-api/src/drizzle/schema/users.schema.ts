import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { exercises } from './exercises.schema'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 400 }).notNull().unique(),
    googleId: varchar('googleId', { length: 500 })
})

export const usersRelations = relations(users, ({ many }) => ({
    createdExercises: many(exercises)
}))

export type InsertUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect
