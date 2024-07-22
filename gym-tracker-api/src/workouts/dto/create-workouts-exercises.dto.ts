import { IsInt } from 'class-validator'

export class CreateWorkoutsExercisesDto {
    @IsInt()
    exerciseId: number
}
