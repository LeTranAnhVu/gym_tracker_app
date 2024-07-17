import { PartialType } from '@nestjs/mapped-types'
import { StartWorkoutLapDto } from './start-workout-lap.dto'
import { IsDate } from 'class-validator'

export class StopWorkoutLapDto extends PartialType(StartWorkoutLapDto) {
    @IsDate()
    endTime: Date
}
