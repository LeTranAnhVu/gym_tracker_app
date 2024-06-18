import { Module } from '@nestjs/common'
import { ExerciseSetsService } from './exercise-sets.service'
import { ExerciseSetsController } from './exercise-sets.controller'
import { DrizzleModule } from 'src/drizzle/drizzle.module'
import { WorkoutsModule } from 'src/workouts/workouts.module'
import { ExercisesModule } from 'src/exercises/exercises.module'

@Module({
    imports: [DrizzleModule, WorkoutsModule, ExercisesModule],
    controllers: [ExerciseSetsController],
    providers: [ExerciseSetsService]
})
export class ExerciseSetsModule {}
