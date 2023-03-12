import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../lib/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({ username })
  }

  async getAllUser() {
    return await this.userRepository.find()
  }
}
