import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { StartWorkoutLapDto } from './dto/start-workout-lap.dto'
import { StopWorkoutLapDto } from './dto/stop-workout-lap.dto'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { asc, eq } from 'drizzle-orm'
import { WorkoutsService } from 'src/workouts/workouts.service'

@Injectable()
export class WorkoutLapsService {
    constructor(
        @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
        private workoutsService: WorkoutsService
    ) {}

    async create(
        userId: number,
        workoutId: number,
        dto: StartWorkoutLapDto
    ): Promise<schema.WorkoutLap> {
        console.log('dto', typeof dto.endTime, dto.endTime)
        const workout = await this.workoutsService.findOne(userId, workoutId)
        const existings = await this.db.query.workoutLaps.findMany({
            where: eq(schema.workoutLaps.workoutId, workout.id)
        })

        if (existings.some((lap) => !lap.endTime)) {
            throw new BadRequestException(
                `Cannot start a new lap while there is an open lap`
            )
        }

        const newLaps = await this.db
            .insert(schema.workoutLaps)
            .values({
                workoutId: workout.id,
                startTime: dto.startTime,
                endTime: dto.endTime || null
            })
            .returning()

        return newLaps[0]
    }

    async findAll(
        userId: number,
        workoutId: number
    ): Promise<schema.WorkoutLap[]> {
        await this.workoutsService.findOne(userId, workoutId)

        return this.db.query.workoutLaps.findMany({
            where: eq(schema.workoutLaps.workoutId, workoutId),
            orderBy: [asc(schema.workoutLaps.startTime)]
        })
    }

    async findOne(
        userId: number,
        workoutId: number,
        id: number
    ): Promise<schema.WorkoutLap> {
        await this.workoutsService.findOne(userId, workoutId)
        const existing = await this.db.query.workoutLaps.findFirst({
            where: eq(schema.workoutLaps.id, id)
        })

        if (!existing) {
            throw new NotFoundException(`Workout lap with id ${id} not found`)
        }

        return existing
    }

    async stopLap(
        userId: number,
        workoutId: number,
        id: number,
        dto: StopWorkoutLapDto
    ) {
        const existing = await this.findOne(userId, workoutId, id)

        if (existing.endTime) {
            throw new BadRequestException(
                `Workout lap with id ${id} is already closed`
            )
        }
        if (dto.endTime < existing.startTime) {
            throw new BadRequestException(
                `End time cannot be before start time`
            )
        }

        const updateRows = await this.db
            .update(schema.workoutLaps)
            .set({ endTime: dto.endTime })
            .where(eq(schema.workoutLaps.id, existing.id))
            .returning()

        return updateRows[0]
    }

    async remove(userId: number, workoutId: number, id: number): Promise<void> {
        const existing = await this.findOne(userId, workoutId, id)
        await this.db
            .delete(schema.workoutLaps)
            .where(eq(schema.workoutLaps.id, existing.id))
    }

    async removeAll(userId: number, workoutId: number): Promise<void> {
        await this.workoutsService.findOne(userId, workoutId)
        await this.db
            .delete(schema.workoutLaps)
            .where(eq(schema.workoutLaps.workoutId, workoutId))
    }
}
