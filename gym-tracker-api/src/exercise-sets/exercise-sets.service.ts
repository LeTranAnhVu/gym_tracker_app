import { Inject, Injectable } from '@nestjs/common'
import { CreateExerciseSetDto } from './dto/create-exercise-set.dto'
import { UpdateExerciseSetDto } from './dto/update-exercise-set.dto'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { and, avg, eq, sql } from 'drizzle-orm'
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

    async findAllGroupedByDate(
        userId: number,
        workoutId: number,
        exerciseId: number
    ) {
        const workout = await this.workoutsService.findOne(userId, workoutId)
        const aggregate = await this.db
            .select({
                workoutId: schema.exerciseSets.workoutId,
                exerciseId: schema.exerciseSets.exerciseId,
                date: sql`"createdAt"::date`,
                sets: sql`count(${schema.exerciseSets.id})::int`,
                avgWeight: sql`round(avg(${schema.exerciseSets.weight}), 2)`,
                avgReps: sql`round(avg(${schema.exerciseSets.reps}), 2)`,
                totalReps: sql`sum(${schema.exerciseSets.reps})::int`,
                progress: sql`'neutral'`
            })
            .from(schema.exerciseSets)
            .groupBy(
                sql`"createdAt"::date`,
                schema.exerciseSets.workoutId,
                schema.exerciseSets.exerciseId
            )
            .having(
                sql`"exerciseId" = ${exerciseId} AND "workoutId" = ${workout.id}`
            )
            .orderBy(sql`"createdAt"::date desc`)

        for (let i = 0; i < aggregate.length; i++) {
            let process = aggregate[i].progress
            if (i < aggregate.length - 1) {
                const previous = aggregate[i + 1]
                const current = aggregate[i]
                if (
                    current.avgWeight == previous.avgWeight &&
                    current.avgReps == previous.avgReps
                ) {
                    process = 'neutral'
                } else if (
                    current.avgWeight > previous.avgWeight &&
                    current.avgReps > previous.avgReps
                ) {
                    process = 'up'
                } else {
                    process = 'down'
                }
            }
            aggregate[i].progress = process
        }

        return aggregate
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
