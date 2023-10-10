// src/users/users.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto/create-user.dto'; // Create DTO for user registration
// import { UpdateUserDto } from './dto/update-user.dto'; // Create DTO for updating user details
import { User } from './user.model';
import { AuthService } from '../auth/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('users')
// @ApiOperation({ summary: 'users' })
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data provided.',
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto as User);
    // return await this.usersService.create(createUserDto as User);
    // return await this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    try {
      // Implement login logic in your UsersService and return a JWT token
      const { accessToken } = await this.authService.login(
        loginUserDto as User,
      );
      //   console.log(accessToken, 'access token');
      return { token: accessToken };
    } catch (err) {
      throw new Error(err + 'not completed');
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto as User);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
