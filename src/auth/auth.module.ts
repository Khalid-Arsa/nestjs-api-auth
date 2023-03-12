import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../lib/entities/user.entity';

@Module({
  imports: [
    UsersModule, 
    PassportModule, 
    JwtModule.register({
      secret: 'SECRET', // put this value in env file to hide the jwt secret
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
