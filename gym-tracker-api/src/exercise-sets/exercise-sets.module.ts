import { Module, forwardRef } from '@nestjs/common'
import { ExerciseSetsService } from './exercise-sets.service'
import { ExerciseSetsController } from './exercise-sets.controller'
import { DrizzleModule } from 'src/drizzle/drizzle.module'
import { WorkoutsModule } from 'src/workouts/workouts.module'
import { ExercisesModule } from 'src/exercises/exercises.module'

@Module({
    imports: [DrizzleModule, forwardRef(() => WorkoutsModule), ExercisesModule],
    controllers: [ExerciseSetsController],
    providers: [ExerciseSetsService],
    exports: [ExerciseSetsService]
})
export class ExerciseSetsModule {}
