import { Module } from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { WorkoutsController } from './workouts.controller'
import { DrizzleModule } from 'src/drizzle/drizzle.module'
import { WorkoutsExercisesController } from './workouts-exercises.controller'
import { ExercisesModule } from 'src/exercises/exercises.module'

@Module({
    imports: [DrizzleModule, ExercisesModule],
    controllers: [WorkoutsController, WorkoutsExercisesController],
    providers: [WorkoutsService],
    exports: [WorkoutsService]
})
export class WorkoutsModule {}
