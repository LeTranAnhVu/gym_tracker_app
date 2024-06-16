import { boolean, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull().unique(),
    isCompleted: boolean('isCompleted'),
    note: text('note')
})

export type InsertTodo = typeof todos.$inferInsert
export type Todo = typeof todos.$inferSelect
