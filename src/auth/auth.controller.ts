
import { Controller, UseGuards, Post, Request, UsePipes, Body } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { CreateUserDto } from './dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UsePipes(new ValidationPipe())
  @Post('/auth/create-user')
  async add(@Request() req) {
    return this.authService.add(req.body)
  }
}
