import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class TransactionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: `transaction type` })
  type: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: `amount` })
  amount: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: `account balance` })
  date: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @ApiProperty({ description: `initiators account` })
  sourceAccount: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @ApiProperty({ description: `receipient's account` })
  destinationAccount: string;
}
