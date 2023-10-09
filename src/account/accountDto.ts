import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: `account number` })
  accountNo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: `type of account` })
  accountType: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(8)
  @ApiProperty({ description: `account balance` })
  accountBalance: number;

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(10)
  // @ApiProperty({ description: `Account owner's id` })
  accountOwner: string;
}
export class UpdateAccountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: `account number` })
  accountNo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: `type of account` })
  accountType: string;
}
