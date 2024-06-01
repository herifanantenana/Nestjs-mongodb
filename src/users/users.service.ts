import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/users.dto';
import { UserSettings } from 'src/schemas/userSettings.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private readonly userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...user }: CreateUserDto) {
    if (settings) {
      const userSettings = new this.userSettingsModel(settings);
      const newUserSettings = await userSettings.save();
      const newUser = new this.userModel({
        ...user,
        settings: newUserSettings._id,
      });
      return newUser.save();
    }
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
