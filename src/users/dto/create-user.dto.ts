import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: `User's name` })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: `User's password` })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: `User's email` })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @ApiProperty({ description: `User's phone` })
  phoneNo: string;
}
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: `User's name` })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: `User's password` })
  password: string;
}
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: `User's name` })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: `User's password` })
  password: string;
}
