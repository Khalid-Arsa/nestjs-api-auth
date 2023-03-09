import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('/user/protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
