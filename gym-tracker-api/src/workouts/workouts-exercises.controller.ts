import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    Req,
    ParseIntPipe,
    Get
} from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { Request } from 'express'
import { CreateWorkoutsExercisesDto } from './dto/create-workouts-exercises.dto'
import { ExerciseSetsService } from 'src/exercise-sets/exercise-sets.service'

@Controller('workouts/:workoutId/exercises')
export class WorkoutsExercisesController {
    constructor(
        private readonly workoutsService: WorkoutsService,
        private readonly setsService: ExerciseSetsService
    ) {}

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

    @Get(':exerciseId/sets')
    getSets(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Param('exerciseId', ParseIntPipe) exerciseId: number
    ) {
        const userId = this.getUserId(req)
        return this.setsService.findAllGroupedByDate(
            userId,
            workoutId,
            exerciseId
        )
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
