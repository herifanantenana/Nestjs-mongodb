import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  createUser(user: CreateUserDto) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find().exec();
  }

  getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  updateUser(id: string, user: any) {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }
  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
