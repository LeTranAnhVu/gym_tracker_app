import { IsOptional, IsString } from 'class-validator'

export class CreateExcerciseDto {
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    info: string
}
