import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './accountDto';
import { Account } from './account.model';
import { CustomRequest } from 'src/auth/custom.request.interface';
import { AuthGuard } from 'src/guards/auth.guard';
@ApiTags('account')
@ApiBearerAuth() // Apply Bearer token authentication to all endpoints in this controller
@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/create')
  async createAccount(
    @Req() req: CustomRequest,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    createAccountDto.accountOwner = req.user.id;
    console.log(req.user);
    // console.log(createAccountDto, 'createAccountDto');
    try {
      const newAccount = await this.accountService.createAccount(
        createAccountDto,
      );
      // console.log(newAccount, 'newAccount controller');
      return newAccount;
    } catch (err) {
      throw new Error(err);
    }
  }
  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    try {
      const account = await this.accountService.getAccountById(id);
      if (!account) throw new Error('Account not found');

      return account;
    } catch (err) {
      throw new Error(err);
    }
  }
  @Patch(':id')
  async updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    try {
      const accountToupdate = await this.accountService.updateAccount(
        id,
        updateAccountDto,
      );
      return accountToupdate;
    } catch (err) {
      throw new Error(err);
    }
  }
  @Delete(':id')
  async deleteAccount(@Param('id') id: string) {
    try {
      const AccountToDelete = await this.accountService.deleteAccount(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}
// {
// "accountNo": "9035526074",
// "accountType": "current",
// "accountBalance": 500,
// "accountOwner": "65142cbe351338cf11a9024a"
//   }
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoaWJ1ZXplIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTY5NTgyMTA5NCwiZXhwIjoxNjk1ODI0Njk0fQ.-y0Xqulzf07AdGZIxcpR1MYbN7zj2vE_GNTc9N-yazM"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoaWJ1ZXplIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTY5NTgyNzg4NywiZXhwIjoxNjk1ODMxNDg3fQ.tHUoQxba6uN_M67VvVMvr6aIgXxKhs_txnZaNxcXGg0
