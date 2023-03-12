import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "my_username",
      "password": "my_password",
      "database": "todo",
      "entities": ["dist/**/**.entity{.ts,.js}"],
      "synchronize": true
    }),
    UsersModule, 
    AuthModule
  ],
  controllers: [AppController],
})

export class AppModule {
  constructor(private readonly connection: Connection) {}
}
