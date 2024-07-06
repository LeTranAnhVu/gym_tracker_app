import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    Req,
    ParseIntPipe
} from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { Request } from 'express'
import { CreateWorkoutsExercisesDto } from './dto/create-workouts-exercises.dto'

@Controller('workouts/:workoutId/exercises')
export class WorkoutsExercisesController {
    constructor(private readonly workoutsService: WorkoutsService) {}

    private getUserId(req: Request): number {
        return req.auth.id
    }

    @Post()
    create(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Body() dto: CreateWorkoutsExercisesDto
    ) {
        const userId = this.getUserId(req)
        return this.workoutsService.addExercise(userId, workoutId, dto)
    }

    @Delete(':exerciseId')
    remove(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Param('exerciseId', ParseIntPipe) exerciseId: number
    ) {
        const userId = this.getUserId(req)
        return this.workoutsService.removeExercise(
            userId,
            workoutId,
            exerciseId
        )
    }
}
