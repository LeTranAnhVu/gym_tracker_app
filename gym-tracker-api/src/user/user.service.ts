import { Inject, Injectable } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'
import * as schema from '../drizzle/schema'
import { eq } from 'drizzle-orm'
@Injectable()
export class UserService {
    constructor(
        @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>
    ) {}

    async syncUser(dto: schema.InsertUser): Promise<schema.User> {
        let existingUser = await this.db.query.users.findFirst({
            where: eq(schema.users.email, dto.email)
        })

        if (!existingUser) {
            existingUser = await this.create(dto)
        }

        return existingUser
    }

    async create(dto: schema.InsertUser): Promise<schema.User> {
        const newUsers = await this.db
            .insert(schema.users)
            .values(dto)
            .returning()

        return newUsers[0]
    }
}
