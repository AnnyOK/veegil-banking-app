import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/user.module';
import { UsersController } from './users/user.controller';
import { UserSchema } from './users/user.model';
import { JwtService } from './auth/jwt.service';
import { JwtService as IjwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AcountModule } from './account/acount.module';
import { AccountController } from './account/account.controller';
import { TransactionModule } from './transaction/transaction.module';
import { AccountService } from './account/account.service';
import { AccountSchema } from './account/account.model';
import { AuthMiddleware } from './auth/auth.middleware';
import { TransactionSchema } from './transaction/transaction.model';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL, {}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
    UsersModule,
    AcountModule,
    TransactionModule,
  ],
  controllers: [
    AppController,
    UsersController,
    AccountController,
    TransactionController,
  ],
  providers: [
    AppService,
    UsersService,
    JwtService,
    AuthService,
    AccountService,
    TransactionService,
    IjwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('account', 'transaction');
    // .forRoutes('transaction');
  }
}
