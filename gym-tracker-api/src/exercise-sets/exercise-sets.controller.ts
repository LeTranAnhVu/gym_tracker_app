import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe
} from '@nestjs/common'
import { ExerciseSetsService } from './exercise-sets.service'
import { CreateExerciseSetDto } from './dto/create-exercise-set.dto'
import { UpdateExerciseSetDto } from './dto/update-exercise-set.dto'
import { Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('workouts/:workoutId/exercise-sets')
export class ExerciseSetsController {
    constructor(private readonly exerciseSetsService: ExerciseSetsService) {}

    private getUserId(req: Request): number {
        return req.auth.id
    }

    @Post()
    create(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Body() createExerciseSetDto: CreateExerciseSetDto
    ) {
        const userId = this.getUserId(req)
        return this.exerciseSetsService.create(
            userId,
            workoutId,
            createExerciseSetDto
        )
    }

    @Get()
    findAll(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number
    ) {
        const userId = this.getUserId(req)
        return this.exerciseSetsService.findAll(userId, workoutId)
    }

    @Get(':id')
    findOne(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Param('id', ParseIntPipe) id: number
    ) {
        const userId = this.getUserId(req)
        return this.exerciseSetsService.findOne(userId, workoutId, id)
    }

    @Patch(':id')
    update(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateExerciseSetDto: UpdateExerciseSetDto
    ) {
        const userId = this.getUserId(req)
        return this.exerciseSetsService.update(
            userId,
            workoutId,
            id,
            updateExerciseSetDto
        )
    }

    @Delete(':id')
    remove(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Param('id', ParseIntPipe) id: number
    ) {
        const userId = this.getUserId(req)
        return this.exerciseSetsService.remove(userId, workoutId, id)
    }
}
