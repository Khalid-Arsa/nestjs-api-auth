import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService
  ) {
    super(); // config
  }

  async validate(
    username: string,
  ): Promise<any> {
    const user = await this.userService.findByEmail(username);

    if (user) {
      const { password, ...rest } = user;
      return rest;
    } else {
      throw new UnauthorizedException();
    }
  }
}