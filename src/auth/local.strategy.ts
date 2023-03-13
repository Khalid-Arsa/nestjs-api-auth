import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {
    super(); // config
  }

  async validate(
    username: string,
  ): Promise<any> {
    const user = await this.userService.findByEmail(username);

    if (user) {
      const { password, username, ...rest } = user;
      return rest;
    } else {
      throw new UnauthorizedException();
    }
  }
}