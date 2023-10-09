import { Injectable } from '@nestjs/common';
import { AccountService as AccountServiceInterface } from './account.service.interface';
import { Account } from './account.model';
import { CreateAccountDto, UpdateAccountDto } from './accountDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountService implements AccountServiceInterface {
  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
  ) {}
  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    // console.log(await this.accountModel.create(createAccountDto), 'testtttt');
    try {
      const newAccount = new this.accountModel(createAccountDto);
      await newAccount.save();
      // console.log(newAccount, 'new account service');

      return newAccount;
    } catch (err) {
      throw new Error(err + 'from createAccount service');
    }
  }
  async getAccountById(id: string): Promise<Account | null> {
    try {
      const account = await this.accountModel.findById(id);
      if (!account) {
        return null;
      }
      return account;
    } catch (err) {
      throw new Error('Method not implemented.');
    }
  }
  async updateAccount(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    try {
      const account = await this.accountModel.findById(id);
      if (!account) throw new Error('Account not found');
      if (updateAccountDto.accountType) {
        account.accountType = updateAccountDto.accountType;
      }
      account.save();
      return account;
    } catch (err) {
      throw new Error('Method not implemented.');
    }
  }
  async deleteAccount(id: string): Promise<void> {
    try {
      const accountTodelete = await this.accountModel.findByIdAndDelete(id);
      if (!accountTodelete) throw new Error('Account not found');
      return;
    } catch (err) {
      throw new Error('Method not implemented.');
    }
  }
  async getAccountBySourceAccount(
    sourceAccount: string,
  ): Promise<Account | undefined> {
    const account = await this.accountModel.findOne({
      accountNo: sourceAccount,
    });
    if (account) {
      return account;
    }
    return;
  }
}
