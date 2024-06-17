import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { DrizzleModule } from 'src/drizzle/drizzle.module'

@Module({
    imports: [DrizzleModule],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
