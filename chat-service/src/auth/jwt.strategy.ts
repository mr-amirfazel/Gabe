/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '2x_Pud8W1ODk4qIffFlE0U8awL-pce3OiT-c2OTWYp0', // Ensure this matches the secret key used in your Go service
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
