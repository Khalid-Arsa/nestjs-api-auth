
import { Controller, UseGuards, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Request, Response } from 'express';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth/create-user')
  async signup(@Req() req: Request, @Res() res: Response) {
    return this.authService.signup(req, res)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/signin')
  async signin(@Req() req: Request, @Res() res: Response) {
    return this.authService.signin(req, res);
  }
}
