import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transactiondto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Transaction } from './transaction.model';
import { CustomRequest } from 'src/auth/custom.request.interface';
import { AccountService } from 'src/account/account.service';
@ApiTags('transaction')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
  ) {}
  @Post('/withdrawal')
  async withdraw(
    @Req() req: CustomRequest,
    @Body() transactionDto: TransactionDto,
  ) {
    const account = await this.accountService.getAccountBySourceAccount(
      transactionDto.sourceAccount,
    );
    if (req.user.id !== account.accountOwner) throw new Error('Unauthorised');
    try {
      const withdrawal = await this.transactionService.withdrawal(
        transactionDto,
      );
      return withdrawal;
    } catch (e) {
      throw new Error('could not complete the service');
    }
  }
  @Post('/deposit')
  async deposit(
    @Req() req: CustomRequest,
    @Body() transactionDto: TransactionDto,
  ) {
    try {
      const deposit = await this.transactionService.deposit(transactionDto);
      return deposit;
    } catch (e) {
      throw new Error('could not complete the service');
    }
  }
  @Post('/transfer')
  async transfer(
    @Req() req: CustomRequest,
    @Body() transactionDto: TransactionDto,
  ): Promise<Transaction> {
    const account = await this.accountService.getAccountBySourceAccount(
      transactionDto.sourceAccount,
    );
    if (req.user.id !== account.accountOwner) throw new Error('Unauthorised');

    try {
      const Transaction = await this.transactionService.transfer(
        transactionDto,
      );
      return Transaction;
    } catch (e) {
      throw new Error(e + ' : could not complete the service');
    }
  }
}
