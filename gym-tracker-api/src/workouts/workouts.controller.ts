import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    ParseIntPipe
} from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { CreateWorkoutDto } from './dto/create-workout.dto'
import { UpdateWorkoutDto } from './dto/update-workout.dto'
import { Request } from 'express'

@Controller('workouts')
export class WorkoutsController {
    constructor(private readonly workoutsService: WorkoutsService) {}

    private getUserId(req: Request): number {
        return req.auth.id
    }

    @Post()
    create(@Req() req: Request, @Body() createWorkoutDto: CreateWorkoutDto) {
        const userId = this.getUserId(req)
        return this.workoutsService.create(userId, createWorkoutDto)
    }

    @Get()
    findAll(@Req() req: Request) {
        const userId = this.getUserId(req)
        return this.workoutsService.findAll(userId)
    }

    @Get(':id')
    findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = this.getUserId(req)
        return this.workoutsService.findOne(userId, id, true)
    }

    @Patch(':id')
    update(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateWorkoutDto: UpdateWorkoutDto
    ) {
        const userId = this.getUserId(req)
        return this.workoutsService.update(userId, id, updateWorkoutDto)
    }

    @Delete(':id')
    remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = this.getUserId(req)
        return this.workoutsService.remove(userId, id)
    }
}
