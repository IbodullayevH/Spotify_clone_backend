import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config(); 

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token not provided or malformed');
        }
        const token = authHeader.split(' ')[1]; 

        try {
            const payload = await this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
            if (!payload) {
                throw new UnauthorizedException('Token verification failed');
            }

            request.payload = payload; 
            return true; 
        } catch (error) {
            throw new UnauthorizedException('JWT verification failed: ' + error.message);
        }
    }
}
