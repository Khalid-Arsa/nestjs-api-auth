import { Injectable } from '@nestjs/common';
import { userData } from 'src/data/user.data';
import { UserType } from 'src/types/user.type';

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
