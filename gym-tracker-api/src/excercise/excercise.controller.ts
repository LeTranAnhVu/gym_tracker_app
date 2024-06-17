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
import { ExcerciseService } from './excercise.service'
import { CreateExcerciseDto } from './dto/create-excercise.dto'
import { UpdateExcerciseDto } from './dto/update-excercise.dto'
import { Request } from 'express'

@Controller('excercises')
export class ExcerciseController {
    constructor(private readonly excerciseService: ExcerciseService) {}

    private getUserId(req: Request): number {
        return req.auth.id
    }

    @Post()
    create(
        @Req() req: Request,
        @Body() createExcerciseDto: CreateExcerciseDto
    ) {
        const userId = this.getUserId(req)
        return this.excerciseService.create(createExcerciseDto, userId)
    }

    @Get()
    findAll(@Req() req: Request) {
        const userId = this.getUserId(req)
        return this.excerciseService.findAll(userId)
    }

    @Get(':id')
    findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = this.getUserId(req)
        return this.excerciseService.findOne(id, userId)
    }

    @Patch(':id')
    update(
        @Req() req: Request,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateExcerciseDto: UpdateExcerciseDto
    ) {
        const userId = this.getUserId(req)
        return this.excerciseService.update(id, userId, updateExcerciseDto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
        const userId = this.getUserId(req)
        return this.excerciseService.remove(id, userId)
    }
}
