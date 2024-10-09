import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: any): Promise<User> {
    return await this.createOrUpdate(createUserDto);
}
async createOrUpdate(profile: any): Promise<User> {
  const { username, emails } = profile;
  const email = emails[0].value;
  
  let user = await this.usersRepository.findOne({ where: { email } });

  if (!user) {
    user = this.usersRepository.create({
      username,
      email,
    });
    await this.usersRepository.save(user);
  }

  return user;
}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, userData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
