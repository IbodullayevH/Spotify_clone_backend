import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

  ) { }

  async create(userData: Partial<User>): Promise<{ success: boolean, message: string, data?: User }> {
    let existUser = await this.usersRepository.findOne({
      where: {
        email: userData.email
      }
    });

    if (existUser) {
      return {
        success: false,
        message: 'User already exists',
      };
    }

    const newUser = this.usersRepository.create(userData);
    const savedUser = await this.usersRepository.save(newUser);

    return {
      success: true,
      message: 'User created successfully',
      data: savedUser,
    };
  }


  // get all users
  async findAll(): Promise<{ success: boolean; message: string; data: User[] }> {
    const users = await this.usersRepository.find();
    return {
      success: true,
      message: 'Users data',
      data: users,
    };
  };

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }


  // update user by id
  async update(userId: number, userData: Partial<User>): Promise<{ success: boolean, message: string, data?: User }> {
    let existUser = await this.usersRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!existUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await this.usersRepository.update(userId, userData);
    const updatedUser = await this.usersRepository.findOne({
      where: { id: userId }
    });

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  // delete
  async remove(userId: number): Promise<{ success: boolean, message: string, data?: User }> {
    let checkUser = await this.usersRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!checkUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await this.usersRepository.delete(userId);

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
