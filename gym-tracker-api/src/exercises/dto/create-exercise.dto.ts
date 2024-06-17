import { IsOptional, IsString } from 'class-validator'

export class CreateExerciseDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    info: string
}
