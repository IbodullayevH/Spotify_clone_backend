import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly usersService: UsersService,
        private readonly jwtservice: JwtService,
    ) {}

    async validateOAuthLogin(profile: any): Promise<string> {
        const user = await this.usersService.createOrUpdate(profile);
        const payload = { username: user.username, id: user.id };
        const token =  this.jwtservice.sign(payload, {secret: process.env.SECRET_KEY});
        return token;
    }

   async getAllMyData(payload: any) {
        const user = await this.userRepository.findOneBy({ id: payload.id})
         return user;
        }

       
    
}
