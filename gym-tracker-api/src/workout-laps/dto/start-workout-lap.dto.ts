import { Transform } from 'class-transformer'
import { IsDate, IsOptional } from 'class-validator'

export class StartWorkoutLapDto {
    @Transform(({ value }) => new Date(value))
    @IsDate()
    startTime: Date

    @IsOptional()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    endTime: Date | null
}
