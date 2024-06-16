import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post
} from '@nestjs/common'

import { TodoService } from './todo.service'
import { InsertTodo } from './drizzle/schema/schema'

@Controller('todos')
export class AppController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    getAll() {
        return this.todoService.findAll()
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.findOne(id)
    }

    @Post()
    create(@Body() dto: InsertTodo) {
        return this.todoService.create(dto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.delete(id)
    }
}
