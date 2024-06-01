import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    const isValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) throw new BadRequestException('Invalid user ID');
    const user = this.usersService.getUserById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() user: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) throw new BadRequestException('Invalid user ID');
    const newUser = await this.usersService.updateUser(userId, user);
    if (!newUser) throw new NotFoundException('User not found');
    return newUser;
  }
}
