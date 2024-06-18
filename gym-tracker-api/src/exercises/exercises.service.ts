import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { CreateExerciseDto } from './dto/create-exercise.dto'
import { UpdateExerciseDto } from './dto/update-exercise.dto'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { and, eq, isNull, ne, or } from 'drizzle-orm'
@Injectable()
export class ExercisesService {
    constructor(
        @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>
    ) {}

    async create(userId: number, dto: CreateExerciseDto) {
        // Make sure no existing name from owner or common exercises before create new one
        const existings = await this.db.query.exercises.findFirst({
            where: and(
                eq(schema.exercises.name, dto.name),
                or(
                    isNull(schema.exercises.createdBy),
                    eq(schema.exercises.createdBy, userId)
                )
            )
        })

        if (existings) {
            throw new BadRequestException('Duplicated name.')
        }

        const createdRows = await this.db
            .insert(schema.exercises)
            .values({ ...dto, createdBy: userId })
            .returning()

        return createdRows[0]
    }

    findAll(userId: number) {
        return this.db.query.exercises.findMany({
            where: or(
                isNull(schema.exercises.createdBy),
                eq(schema.exercises.createdBy, userId)
            )
        })
    }

    async findOne(userId: number, id: number) {
        const ex = await this.db.query.exercises.findFirst({
            where: and(
                eq(schema.exercises.id, id),
                or(
                    isNull(schema.exercises.createdBy),
                    eq(schema.exercises.createdBy, userId)
                )
            )
        })

        if (!ex) {
            throw new NotFoundException(`Exersise with id ${id} Not Found`)
        }

        return ex
    }

    async update(userId: number, id: number, dto: UpdateExerciseDto) {
        const existingEx = await this.findOne(userId, id)

        // make sure no duplicated name even in the common
        if (dto.name) {
            const changedName = dto.name
            const duplicated = await this.db.query.exercises.findFirst({
                where: and(
                    eq(schema.exercises.name, changedName),
                    ne(schema.exercises.id, id),
                    or(
                        isNull(schema.exercises.createdBy),
                        eq(schema.exercises.createdBy, userId)
                    )
                )
            })

            if (duplicated) {
                throw new BadRequestException('Duplicated name.')
            }
        }

        const updatedRows = await this.db
            .update(schema.exercises)
            .set(dto)
            .where(eq(schema.exercises.id, existingEx.id))
            .returning()

        return updatedRows[0]
    }

    async remove(userId: number, id: number) {
        const existingEx = await this.findOne(userId, id)
        await this.db
            .delete(schema.exercises)
            .where(eq(schema.exercises.id, existingEx.id))
    }
}
