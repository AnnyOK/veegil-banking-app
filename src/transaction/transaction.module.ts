import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './transaction.model';
import { AccountSchema } from 'src/account/account.model';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { JwtService } from 'src/auth/jwt.service';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    AccountService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Register the RolesGuard as a global guard
    },
  ],
})
export class TransactionModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes('transaction');
  // }
  // .forRoutes('transaction');
}
