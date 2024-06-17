declare namespace Express {
    interface Request {
        auth: TokenPayload
    }
}

interface TokenPayload {
    id: number // from db
    email: string
    iss: string
    sub: string
    aud: string[]
    iat: number
    exp: number
    scope: string
    azp: string
    permissions: string[]
}
