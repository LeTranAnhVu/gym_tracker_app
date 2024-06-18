import { Inject, Injectable } from '@nestjs/common'
import { CreateExerciseSetDto } from './dto/create-exercise-set.dto'
import { UpdateExerciseSetDto } from './dto/update-exercise-set.dto'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { and, eq } from 'drizzle-orm'
import { NotFoundException } from '@nestjs/common'
import { WorkoutsService } from 'src/workouts/workouts.service'
import { ExercisesService } from 'src/exercises/exercises.service'

@Injectable()
export class ExerciseSetsService {
    constructor(
        @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
        private workoutsService: WorkoutsService,
        private exService: ExercisesService
    ) {}

    async create(
        userId: number,
        workoutId: number,
        dto: CreateExerciseSetDto
    ): Promise<schema.ExerciseSet> {
        const workout = await this.workoutsService.findOne(userId, workoutId)
        const exercise = await this.exService.findOne(userId, dto.exerciseId)
        const createdRows = await this.db
            .insert(schema.exerciseSets)
            .values({
                ...dto,
                workoutId: workout.id,
                exerciseId: exercise.id,
                createdAt: new Date()
            })
            .returning()

        return createdRows[0]
    }

    async findAll(
        userId: number,
        workoutId: number
    ): Promise<schema.ExerciseSet[]> {
        const workout = await this.workoutsService.findOne(userId, workoutId)
        return this.db.query.exerciseSets.findMany({
            where: eq(schema.exerciseSets.workoutId, workout.id)
        })
    }

    async findOne(
        userId: number,
        workoutId: number,
        exerciseSetId: number
    ): Promise<schema.ExerciseSet> {
        const workout = await this.workoutsService.findOne(userId, workoutId)
        const existing = await this.db.query.exerciseSets.findFirst({
            where: and(
                eq(schema.exerciseSets.workoutId, workout.id),
                eq(schema.exerciseSets.id, exerciseSetId)
            )
        })

        if (!existing) {
            throw new NotFoundException(
                `ExerciseSet with id ${exerciseSetId} not found`
            )
        }

        return existing
    }

    async update(
        userId: number,
        workoutId: number,
        exerciseSetId: number,
        dto: UpdateExerciseSetDto
    ): Promise<schema.ExerciseSet> {
        const existing = await this.findOne(userId, workoutId, exerciseSetId)
        const existingExercise = await this.exService.findOne(
            userId,
            existing.exerciseId
        )

        const updatedRows = await this.db
            .update(schema.exerciseSets)
            .set({ ...dto, exerciseId: existingExercise.id })
            .where(eq(schema.exerciseSets.id, existing.id))
            .returning()

        return updatedRows[0]
    }

    async remove(
        userId: number,
        workoutId: number,
        exerciseSetId: number
    ): Promise<void> {
        const existing = await this.findOne(userId, workoutId, exerciseSetId)
        await this.db
            .delete(schema.exerciseSets)
            .where(eq(schema.exerciseSets.id, existing.id))
    }
}
