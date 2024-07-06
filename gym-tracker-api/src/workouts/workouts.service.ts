import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { and, desc, eq, ilike } from 'drizzle-orm'
import { CreateWorkoutsExercisesDto } from './dto/create-workouts-exercises.dto'
import { ExercisesService } from 'src/exercises/exercises.service'

@Injectable()
export class WorkoutsService {
    constructor(
        @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
        private readonly exercisesService: ExercisesService
    ) {}

    async create(
        userId: number,
        dto: CreateWorkoutDto
    ): Promise<schema.Workout> {
        let workoutName = dto.name
        const duplicatedOnes = await this.db.query.workouts.findMany({
            where: and(
                eq(schema.workouts.createdBy, userId),
                ilike(schema.workouts.name, `${dto.name}%`)
            ),
            orderBy: [desc(schema.workouts.createdAt)]
        })

        if (duplicatedOnes.length > 0) {
            workoutName = `${dto.name} (${duplicatedOnes.length})`
        }

        const createdRows = await this.db
            .insert(schema.workouts)
            .values({
                ...dto,
                name: workoutName,
                createdBy: userId,
                createdAt: new Date()
            })
            .returning()
        return createdRows[0]
    }

    findAll(userId: number): Promise<schema.Workout[]> {
        return this.db.query.workouts.findMany({
            where: eq(schema.workouts.createdBy, userId),
            orderBy: [desc(schema.workouts.createdAt)]
        })
    }

    async findOne(
        userId: number,
        workoutId: number,
        detail: boolean = false
    ): Promise<schema.Workout> {
        const existing = await this.db.query.workouts.findFirst({
            with: detail
                ? {
                      exercises: {
                          with: {
                              exercise: true
                          }
                      }
                  }
                : {},
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

    async addExercise(
        userId: number,
        workoutId: number,
        dto: CreateWorkoutsExercisesDto
    ): Promise<schema.WorkoutExercise> {
        const workout = await this.findOne(userId, workoutId)
        const exercise = await this.exercisesService.findOne(
            userId,
            dto.exerciseId
        )
        const createdRows = await this.db
            .insert(schema.workoutsExercises)
            .values({
                ...dto,
                exerciseId: exercise.id,
                workoutId: workout.id,
                createdAt: new Date()
            })
            .returning()
        return createdRows[0]
    }

    async removeExercise(
        userId: number,
        workoutId: number,
        workoutExercisesId: number
    ): Promise<void> {
        const existingWorkout = await this.findOne(userId, workoutId)
        const existing = await this.db.query.workoutsExercises.findFirst({
            where: and(
                eq(schema.workoutsExercises.workoutId, existingWorkout.id),
                eq(schema.workoutsExercises.id, workoutExercisesId)
            )
        })

        await this.db
            .delete(schema.workoutsExercises)
            .where(eq(schema.workoutsExercises.id, existing.id))
    }
}
