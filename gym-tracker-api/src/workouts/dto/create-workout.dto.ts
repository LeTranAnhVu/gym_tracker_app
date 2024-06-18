import { IsString, MaxLength } from 'class-validator'

export class CreateWorkoutDto {
    @IsString()
    @MaxLength(300)
    name: string
}
