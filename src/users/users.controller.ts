import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private userService: UsersService) {}
  
  // @UseGuards(JwtAuthGuard)
  @Get('/user/get-users')
  getUser(): any {
    return this.userService.getAllUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
