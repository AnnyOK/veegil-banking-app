import { CustomRequest } from 'src/auth/custom.request.interface';
import { Account } from './account.model';
import { CreateAccountDto, UpdateAccountDto } from './accountDto';

export interface AccountService {
  createAccount(createAccountDto: CreateAccountDto): Promise<Account>;
  // createAccount(createAccountDto: CreateAccountDto): Promise<Account>;
  getAccountById(id: string): Promise<Account>;
  updateAccount(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account>;
  deleteAccount(id: string): Promise<void>;
}
