import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GetVerificationKey, expressjwt } from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import { promisify } from 'util'
import { Request, Response } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
    private AUTH0_AUD: string
    private AUTH0_DOMAIN: string
    constructor(private configService: ConfigService) {
        this.AUTH0_AUD = this.configService.get('AUTH0_AUD')
        this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN')
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        const checkJwt = promisify(
            expressjwt({
                secret: expressJwtSecret({
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`
                }) as GetVerificationKey,
                audience: this.AUTH0_AUD,
                issuer: this.AUTH0_DOMAIN,
                algorithms: ['RS256']
            })
        )

        try {
            await checkJwt(request, response)
            if (!this.hasPermission('impersonate:user', request)) {
                throw new UnauthorizedException()
            }

            return true
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }

    private hasPermission(permission: string, req: Request) {
        return req?.auth?.permissions.includes(permission) ?? false
    }
}
