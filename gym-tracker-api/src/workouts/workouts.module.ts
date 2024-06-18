import { Module } from '@nestjs/common'
import { WorkoutsService } from './workouts.service'
import { WorkoutsController } from './workouts.controller'
import { DrizzleModule } from 'src/drizzle/drizzle.module'

@Module({
    imports: [DrizzleModule],
    controllers: [WorkoutsController],
    providers: [WorkoutsService],
    exports: [WorkoutsService]
})
export class WorkoutsModule {}
