import { Controller, Get } from '@nestjs/common'

@Controller('test')
export class AppController {
    @Get()
    getAll() {
        return 'api is running'
    }
}
