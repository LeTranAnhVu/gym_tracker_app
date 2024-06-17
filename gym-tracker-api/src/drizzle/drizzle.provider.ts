import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const DrizzleAsyncProvider = 'drizzleProvider'
export const drizzleProvider = [
    {
        provide: DrizzleAsyncProvider,
        useFactory: async () => {
            console.log('Create a db connection...')
            const client = new Client(process.env.DATABASE_URL)
            await client.connect()
            const db = drizzle(client, { schema })
            return db
        },
        exports: [DrizzleAsyncProvider]
    }
]
