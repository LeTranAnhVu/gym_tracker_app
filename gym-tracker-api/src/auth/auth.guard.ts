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
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
    private AUTH0_AUD: string
    private AUTH0_DOMAIN: string
    constructor(
        private configService: ConfigService,
        private userService: UserService
    ) {
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
            if (!request.auth.email) {
                throw new UnauthorizedException()
            }

            if (!this.hasPermission('impersonate:user', request)) {
                throw new UnauthorizedException()
            }

            await this.syncUser(request)

            return true
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }

    private hasPermission(permission: string, req: Request) {
        return req?.auth?.permissions.includes(permission) ?? false
    }

    private async syncUser(req: Request) {
        const { email, sub } = req.auth
        const user = await this.userService.syncUser({
            email: email,
            googleId: sub
        })

        req.auth.id = user.id
    }
}
