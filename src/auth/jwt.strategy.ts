import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() { 
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET' // put this value in env file to hide the jwt secret
    })
  }

  async validate(payload: any) {
    // const user = this.usersService.getById(payload.sub);
    return {
      id: payload.sub,
      name: payload.name
    }
  }
}
