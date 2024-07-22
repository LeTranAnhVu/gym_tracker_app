import { Transform } from 'class-transformer'
import { IsDate } from 'class-validator'

export class StopWorkoutLapDto {
    @Transform(({ value }) => new Date(value))
    @IsDate()
    endTime: Date
}
