import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true // ignore the field from json that is not defined in the dto
        })
    )
    app.setGlobalPrefix('api')
    await app.listen(8000)
}
bootstrap()
