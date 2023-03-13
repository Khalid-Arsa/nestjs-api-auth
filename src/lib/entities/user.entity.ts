import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, isInt, IsNotEmpty, IsString } from 'class-validator';
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty({message: 'Please provide a valid name'})
  @IsString({ message: "Name must be a string" })
  firstName: string;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty({message: 'Please provide a valid username'})
  @IsString({ message: "Username must be a string" })
  lastName: string;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty({message: 'Please provide a valid email'})
  @IsEmail({}, {message: 'Invalid email address'})
  @IsString({ message: "Email must be a string" })
  email: string;

  @Column({ nullable: false })  
  @IsNotEmpty({message: 'Please provide a valid password'})
  @IsString({ message: "Password must be a string" })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
};
