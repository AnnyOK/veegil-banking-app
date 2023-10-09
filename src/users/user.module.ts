import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.model'; // Import your user model
import { AuthService } from 'src/auth/auth.service';
// import { JwtService } from '@nestjs/jwt';
import { JwtService } from 'src/auth/jwt.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [
    UsersService,
    //  User
  ], // Export the User model
})
export class UsersModule {}
