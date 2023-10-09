import { Transaction } from './transaction.model';
import { TransactionDto } from './transactiondto';

export interface TransactionService {
  withdrawal(transactionDto: TransactionDto): Promise<Transaction>;
  deposit(transactionDto: TransactionDto): Promise<Transaction>;
  transfer(transactionDto: TransactionDto): Promise<Transaction>;
}
