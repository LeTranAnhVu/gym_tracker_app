import { Module, forwardRef } from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { WorkoutsController } from './workouts.controller'
import { DrizzleModule } from 'src/drizzle/drizzle.module'
import { WorkoutsExercisesController } from './workouts-exercises.controller'
import { ExercisesModule } from 'src/exercises/exercises.module'
import { ExerciseSetsModule } from 'src/exercise-sets/exercise-sets.module'

@Module({
    imports: [
        DrizzleModule,
        ExercisesModule,
        forwardRef(() => ExerciseSetsModule)
    ],
    controllers: [WorkoutsController, WorkoutsExercisesController],
    providers: [WorkoutsService],
    exports: [WorkoutsService]
})
export class WorkoutsModule {}
