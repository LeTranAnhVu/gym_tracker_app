import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from './drizzle/drizzle.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'
import { UsersModule } from './users/users.module'
import { ExercisesModule } from './exercises/exercises.module'
import { WorkoutsModule } from './workouts/workouts.module'
import { ExerciseSetsModule } from './exercise-sets/exercise-sets.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.local', '.env']
        }),
        DrizzleModule,
        AuthModule,
        UsersModule,
        ExercisesModule,
        WorkoutsModule,
        ExerciseSetsModule
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
