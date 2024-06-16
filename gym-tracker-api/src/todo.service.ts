import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { DrizzleAsyncProvider } from './drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { schema } from './drizzle/schema'
import { InsertTodo } from './drizzle/schema/schema'
import { eq } from 'drizzle-orm'

@Injectable()
export class TodoService {
    constructor(
        @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>
    ) {}

    async create(dto: InsertTodo) {
        const todo = await this.db.query.todos.findFirst({
            where: eq(schema.todos.name, dto.name)
        })

        if (todo) {
            throw new ConflictException('Todo is duplicated')
        }

        const newTodos = await this.db
            .insert(schema.todos)
            .values({
                ...dto
            })
            .returning()

        return newTodos[0]
    }

    async findOne(id: number) {
        const todo = await this.db.query.todos.findFirst({
            where: eq(schema.todos.id, id)
        })

        if (!todo) {
            throw new NotFoundException(`todo id ${id} not found`)
        }

        return todo
    }

    async findAll() {
        // return await this.db.select().from(schema.todos)
        return await this.db.query.todos.findMany()
    }

    async delete(id: number) {
        const todo = await this.findOne(id)
        await this.db.delete(schema.todos).where(eq(schema.todos.id, todo.id))
    }
}
