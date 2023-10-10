import { Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UsersService } from '../users/users.service'; // Import your users service
import { User } from '../users/user.model'; // Import your user model
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: User): Promise<User> {
    // Implemented user registration logic here
    // I hashed the password before saving it to the database
    // You may want to check if the username is already taken
    // Save the user to the database and return the saved user
    const isUsernameAvailble = await this.usersService.findByUsername(
      user.username,
    );
    if (isUsernameAvailble) throw new Error('User already taken');
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
    return await this.usersService.create(user);
  }

  async login(user: User): Promise<{ accessToken: string }> {
    // Implement user login logic here
    // Check if the user exists and the password is correct
    // If valid, create a JWT token and return it
    const validatedUser = await this.validateUser(user);
    // console.log(validatedUser, 'validateuser');
    if (!validatedUser) {
      // Handle authentication failure
      throw new Error('user not found');
      //   return null;
    }

    const payload = {
      username: validatedUser.username,
      // password: validatedUser.password,
      phoneNo: validatedUser.phoneNo,
      email: validatedUser.email,
      id: validatedUser._id,
    };
    // const accessToken = this.jwtService.sign(payload);
    const accessToken = this.jwtService.generateToken(payload);
    // console.log(accessToken, 'Access token');

    return { accessToken };
  }

  async validateUser(user: JwtPayload): Promise<User | null> {
    // Implement user validation logic here
    // Check if the user exists in your database and if the password is correct
    const existingUser = await this.usersService.findByUsername(user.username);
    if (!existingUser) return null;
    // console.log(user.password, existingUser.password, 'password');
    const isValidUser = await bcrypt.compare(
      user.password,
      existingUser.password,
    );
    console.log(isValidUser, existingUser.password, 'isUser');
    if (isValidUser) {
      console.log(existingUser);
      return existingUser;
    }

    return null;
  }
}
