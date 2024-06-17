import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 400 }).notNull().unique(),
    googleId: varchar('googleId', { length: 500 }),
    loggedInAt: timestamp('loggedInAt', { withTimezone: true })
})

export type InsertUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect
