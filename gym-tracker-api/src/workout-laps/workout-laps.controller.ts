import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    Req
} from '@nestjs/common'
import { WorkoutLapsService } from './workout-laps.service'
import { StartWorkoutLapDto } from './dto/start-workout-lap.dto'
import { StopWorkoutLapDto } from './dto/stop-workout-lap.dto'
import { Request } from 'express'

@Controller('workouts/:workoutId/laps')
export class WorkoutLapsController {
    constructor(private readonly lapsService: WorkoutLapsService) {}

    private getUserId(req: Request): number {
        return req.auth.id
    }

    @Post()
    create(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Body() createWorkoutLapDto: StartWorkoutLapDto
    ) {
        const userId = this.getUserId(req)
        return this.lapsService.create(userId, workoutId, createWorkoutLapDto)
    }

    @Get()
    findAll(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number
    ) {
        const userId = this.getUserId(req)
        return this.lapsService.findAll(userId, workoutId)
    }

    @Get(':id')
    findOne(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Param('id', ParseIntPipe) id: number
    ) {
        const userId = this.getUserId(req)
        return this.lapsService.findOne(userId, workoutId, id)
    }

    @Post(':id/stop')
    update(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateWorkoutLapDto: StopWorkoutLapDto
    ) {
        const userId = this.getUserId(req)
        return this.lapsService.stopLap(
            userId,
            workoutId,
            id,
            updateWorkoutLapDto
        )
    }

    @Delete(':id')
    remove(
        @Req() req: Request,
        @Param('workoutId', ParseIntPipe) workoutId: number,
        @Param('id', ParseIntPipe) id: number
    ) {
        const userId = this.getUserId(req)
        return this.lapsService.remove(userId, workoutId, id)
    }
}
