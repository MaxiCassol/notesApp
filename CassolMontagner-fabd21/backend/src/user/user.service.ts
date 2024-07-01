import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error(`User with username "${username}" not found`);
    }
    return user;
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async update(id: string, updateUser: User): Promise<User> {
    return this.userRepository.update(id, updateUser);
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
