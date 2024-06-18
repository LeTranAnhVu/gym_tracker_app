import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { and, eq } from 'drizzle-orm'

@Injectable()
export class WorkoutsService {
    constructor(
        @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>
    ) {}

    async create(
        userId: number,
        dto: CreateWorkoutDto
    ): Promise<schema.Workout> {
        const createdRows = await this.db
            .insert(schema.workouts)
            .values({ ...dto, createdBy: userId, createdAt: new Date() })
            .returning()
        return createdRows[0]
    }

    findAll(userId: number): Promise<schema.Workout[]> {
        return this.db.query.workouts.findMany({
            where: eq(schema.workouts.createdBy, userId)
        })
    }

    async findOne(userId: number, workoutId: number): Promise<schema.Workout> {
        const existing = await this.db.query.workouts.findFirst({
            where: and(
                eq(schema.workouts.createdBy, userId),
                eq(schema.workouts.id, workoutId)
            )
        })

        if (!existing) {
            throw new NotFoundException(
                `Workout with id ${workoutId} not found`
            )
        }

        return existing
    }

    async update(
        userId: number,
        workoutId: number,
        dto: UpdateWorkoutDto
    ): Promise<schema.Workout> {
        const existing = await this.findOne(userId, workoutId)
        const updatedRows = await this.db
            .update(schema.workouts)
            .set(dto)
            .where(eq(schema.workouts.id, existing.id))
            .returning()

        return updatedRows[0]
    }

    async remove(userId: number, workoutId: number): Promise<void> {
        const existing = await this.findOne(userId, workoutId)
        await this.db
            .delete(schema.workouts)
            .where(eq(schema.workouts.id, existing.id))
    }
}
