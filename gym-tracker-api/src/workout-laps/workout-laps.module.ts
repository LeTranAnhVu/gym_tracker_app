import { Module } from '@nestjs/common'
import { WorkoutLapsService } from './workout-laps.service'
import { WorkoutLapsController } from './workout-laps.controller'
import { WorkoutsModule } from 'src/workouts/workouts.module'
import { DrizzleModule } from 'src/drizzle/drizzle.module'

@Module({
    controllers: [WorkoutLapsController],
    providers: [WorkoutLapsService],
    imports: [DrizzleModule, WorkoutsModule]
})
export class WorkoutLapsModule {}
