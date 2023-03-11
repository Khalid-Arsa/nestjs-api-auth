import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto';
import { AuthRO } from './auth.interface';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly userRepository: Repository<AuthEntity>,
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(
    username: string,
    password: string
  ): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    };

    return null
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      sub: user.id
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async add(dto: CreateUserDto): Promise<AuthRO> {
    // check uniqueness of username/email
    const {
      name,
      username,
      email,
      password
    } = dto

    // create new user
    let newUser = new AuthEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = {username: 'Userinput is not valid.'};
      throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);

    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildAuthRO(savedUser);
    }
  }

  private buildAuthRO(user: AuthEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };

    return {user: userRO};
  }
}
