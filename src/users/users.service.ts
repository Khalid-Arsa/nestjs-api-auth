import { Injectable } from '@nestjs/common';
import { UserType } from '../types/user.type';
import { userData } from '../data/user.data';

@Injectable()
export class UsersService {
  private readonly users: UserType[];
  
  constructor() {
    this.users = userData
  }

  async findOne(username: string): Promise<UserType | undefined> {
    return this.users.find(user => user.username === username);
  }
}
