import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { CreateExcerciseDto } from './dto/create-excercise.dto'
import { UpdateExcerciseDto } from './dto/update-excercise.dto'
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../drizzle/schema'
import { and, eq, isNull, ne, or } from 'drizzle-orm'
@Injectable()
export class ExcerciseService {
    constructor(
        @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>
    ) {}

    async create(dto: CreateExcerciseDto, userId?: number) {
        // Make sure no existing name from owner or common excercies before create new one
        const existings = await this.db.query.excercies.findFirst({
            where: and(
                eq(schema.excercies.name, dto.name),
                or(
                    isNull(schema.excercies.createdBy),
                    eq(schema.excercies.createdBy, userId)
                )
            )
        })

        if (existings) {
            throw new BadRequestException('Duplicated name.')
        }

        const createdRows = await this.db
            .insert(schema.excercies)
            .values({ ...dto, createdBy: userId })
            .returning()

        return createdRows[0]
    }

    findAll(userId: number) {
        return this.db.query.excercies.findMany({
            where: or(
                isNull(schema.excercies.createdBy),
                eq(schema.excercies.createdBy, userId)
            )
        })
    }

    async findOne(id: number, userId: number) {
        const ex = await this.db.query.excercies.findFirst({
            where: and(
                eq(schema.excercies.id, id),
                or(
                    isNull(schema.excercies.createdBy),
                    eq(schema.excercies.createdBy, userId)
                )
            )
        })

        if (!ex) {
            throw new NotFoundException(`Excersise with id ${id} Not Found`)
        }

        return ex
    }

    async update(
        id: number,
        userId: number,
        updateExcerciseDto: UpdateExcerciseDto
    ) {
        const existingEx = await this.findOne(id, userId)

        // make sure no duplicated name even in the common
        if (updateExcerciseDto.name) {
            const changedName = updateExcerciseDto.name
            const duplicated = await this.db.query.excercies.findFirst({
                where: and(
                    eq(schema.excercies.name, changedName),
                    ne(schema.excercies.id, id),
                    or(
                        isNull(schema.excercies.createdBy),
                        eq(schema.excercies.createdBy, userId)
                    )
                )
            })

            if (duplicated) {
                throw new BadRequestException('Duplicated name.')
            }
        }

        const updatedRows = await this.db
            .update(schema.excercies)
            .set(updateExcerciseDto)
            .where(eq(schema.excercies.id, existingEx.id))
            .returning()

        return updatedRows[0]
    }

    async remove(id: number, userId: number) {
        const existingEx = await this.findOne(id, userId)
        await this.db
            .delete(schema.excercies)
            .where(eq(schema.excercies.id, existingEx.id))
    }
}
