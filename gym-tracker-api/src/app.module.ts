import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { TodoService } from './todo.service'
import { DrizzleModule } from './drizzle/drizzle.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.local', '.env']
        }),
        DrizzleModule
    ],
    controllers: [AppController],
    providers: [TodoService]
})
export class AppModule {}
