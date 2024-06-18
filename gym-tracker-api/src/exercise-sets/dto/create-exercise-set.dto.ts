import {
    IsDecimal,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength
} from 'class-validator'

export class CreateExerciseSetDto {
    @IsOptional()
    @IsString()
    @MaxLength(400)
    customName: string

    @IsOptional()
    @IsDecimal({ decimal_digits: '1' })
    weight: string

    @IsOptional()
    @IsNumber()
    reps: number

    @IsOptional()
    @IsString()
    note: string

    @IsNumber()
    exerciseId: number
}
