import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { UserEntity } from '../lib/entities/user.entity';
import { AppError } from '../shared/error';
import { RequestHandler } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async signin(req: Request, res: Response) {
    const { id, name, email }: any = req.user;

    return res.status(201).json({
      access_token: this.jwtService.sign({name, id}),
      name: name,
      email: email,
    })
  }

  async signup(req: Request, res: Response) {
    try {
      const {
        name,
        username,
        email,
        password
      } = req.body

      // check uniqueness of username/email
      const isUserExist = await this.userRepository
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .orWhere('user.email = :email', { email })
        .getOne()

      if (isUserExist) {
        return new AppError('Username and email must be unique.', 400)
      }

      // create new user
      let newUser: CreateUserDto = new UserEntity();
      newUser.username = username;
      newUser.email = email;
      newUser.password = password;
      newUser.name = name;

      const error = await validate(newUser);

      if (error.length > 0) {
        return new AppError('Input data validation failed', 400, error)
      } else {
        const savedUser = await this.userRepository.save(newUser);
        return this.buildUserRO(savedUser, res);
      }
    } catch (error: any) {
      console.log("Error: ", error)
    }
  }

  private buildUserRO(user: UserEntity, res: Response) {
    const userRO = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    };

    return res.status(201).json({
      user: userRO,
      message: "Create user successfully",
      success: true
    })
  }
}
