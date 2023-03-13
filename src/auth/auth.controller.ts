
import { Controller, UseGuards, Post, Req, UsePipes, Body, Res } from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { CreateUserDto } from './dto';
import { Request, Response } from 'express';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/signin')
  async signin(@Req() req: Request, @Res() res: Response) {
    return this.authService.signin(req, res);
  }

  // @UsePipes(new ValidationPipe())
  @Post('/auth/create-user')
  async signup(@Req() req: Request, @Res() res: Response) {
    return this.authService.signup(req, res)
  }
}
