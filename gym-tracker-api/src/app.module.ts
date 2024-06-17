import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { TodoService } from './todo.service'
import { DrizzleModule } from './drizzle/drizzle.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.local', '.env']
        }),
        DrizzleModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        TodoService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AppModule {}
