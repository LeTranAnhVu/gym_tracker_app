import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    HttpStatus,
    HttpCode,
    Req
} from '@nestjs/common'
import { ExercisesService } from './exercises.service'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { Request } from 'express'

@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) {}

    private getUserId(req: Request): number {
        return req.auth.id
    }

    @Post()
    create(@Req() req: Request, @Body() dto: CreateExerciseDto) {
        const userId = this.getUserId(req)
        return this.exercisesService.create(userId, dto)
    }

    @Get()
    findAll(@Req() req: Request) {
        const userId = this.getUserId(req)
        return this.exercisesService.findAll(userId)
    }

    @Get(':id')
    findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = this.getUserId(req)
        return this.exercisesService.findOne(userId, id)
    }

    @Patch(':id')
    update(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateExerciseDto
    ) {
        const userId = this.getUserId(req)
        return this.exercisesService.update(userId, id, dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = this.getUserId(req)
        return this.exercisesService.remove(userId, id)
    }
}
