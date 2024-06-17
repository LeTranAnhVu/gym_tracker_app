import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from './drizzle/drizzle.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.local', '.env']
        }),
        DrizzleModule,
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AppModule {}
