import { Injectable } from '@nestjs/common';
import { TransactionService as TransactionServiceInterface } from './transaction.service.interface';
import { Transaction } from './transaction.model';
import { TransactionDto } from './transactiondto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { Account } from 'src/account/account.model';
@Injectable()
export class TransactionService implements TransactionServiceInterface {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
    @InjectModel('Account')
    private readonly accountModel: Model<Account>,
  ) {}

  async withdrawal(transactionDto: TransactionDto): Promise<Transaction> {
    const session = await this.transactionModel.db.startSession();

    try {
      const sourceAccount = await this.accountModel.findOne({
        accountNo: transactionDto.sourceAccount,
      });
      const transaction = {
        type: transactionDto.type,
        amount: transactionDto.amount,
        date: Date.now(),
        sourceAccount: sourceAccount.id,
      };
      if (!sourceAccount) throw new Error(`source account not found`);
      if (sourceAccount.accountBalance < transactionDto.amount)
        throw new Error('Insufficent fund');
      if (transactionDto.type === 'Withdrawal') {
        session.startTransaction();
        const newTransaction = await this.transactionModel.create(
          [transaction],
          { session },
        );
        // .session(session);
        sourceAccount.accountBalance -= newTransaction[0].amount;
        sourceAccount.save({ session });
        await session.commitTransaction();
        session.endSession();
        return newTransaction[0];
      }
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(err);
    }
  }
  async deposit(transactionDto: TransactionDto): Promise<Transaction> {
    const session = await this.transactionModel.db.startSession();

    try {
      const sourceAccount = await this.accountModel.findOne({
        accountNo: transactionDto.sourceAccount,
      });
      const transaction = {
        type: transactionDto.type,
        amount: transactionDto.amount,
        date: Date.now(),
        sourceAccount: sourceAccount.id,
      };
      if (!sourceAccount) throw new Error(`source account not found`);

      if (transactionDto.type === 'Deposit') {
        session.startTransaction();
        const newTransaction = await this.transactionModel.create(
          [transaction],
          { session },
        );
        // .session(session);
        sourceAccount.accountBalance += newTransaction[0].amount;
        sourceAccount.save({ session });
        await session.commitTransaction();
        session.endSession();
        return newTransaction[0];
      }
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(err);
    }
  }
  async transfer(transactionDto: TransactionDto): Promise<Transaction> {
    const session = await this.transactionModel.db.startSession();
    try {
      const sourceAccount = await this.accountModel.findOne({
        accountNo: transactionDto.sourceAccount,
      });
      const destinationAccount = await this.accountModel.findOne({
        accountNo: transactionDto.destinationAccount,
      });
      const transaction = {
        type: transactionDto.type,
        amount: transactionDto.amount,
        date: Date.now(),
        sourceAccount: sourceAccount.id,
        destinationAccount: destinationAccount.id,
      };
      if (!sourceAccount || !destinationAccount)
        throw new Error('could not complete the transaction');
      if (
        transactionDto.type === 'Transfer' &&
        sourceAccount.accountBalance >= transaction.amount
      ) {
        session.startTransaction();
        const newTransaction = await this.transactionModel.create(
          [transaction],
          { session },
        );
        sourceAccount.accountBalance -= newTransaction[0].amount;
        destinationAccount.accountBalance += newTransaction[0].amount;
        await sourceAccount.save({ session });
        await destinationAccount.save({ session });
        await session.commitTransaction();
        await session.endSession();
        console.log(newTransaction[0]);
        return (
          await newTransaction[0].populate(
            'destinationAccount',
            'accountNo -_id',
          )
        ).populate('sourceAccount', 'accountNo -_id');
      }
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  }
}
