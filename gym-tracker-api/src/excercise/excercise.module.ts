import { Module } from '@nestjs/common'
import { ExcerciseService } from './excercise.service'
import { ExcerciseController } from './excercise.controller'
import { DrizzleModule } from 'src/drizzle/drizzle.module'

@Module({
    imports: [DrizzleModule],
    controllers: [ExcerciseController],
    providers: [ExcerciseService]
})
export class ExcerciseModule {}
