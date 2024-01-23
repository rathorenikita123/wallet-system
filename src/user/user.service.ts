// user service
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
// import ShortUniqueId from 'short-unique-id';
// import ShortUniqueId from 'short-unique-id';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    try {
      const existingEmailUser = await this.userModel.findOne({
        email: user.email,
      });
      if (existingEmailUser) {
        throw new ConflictException('Email is already in use');
      }

      // Check for unique phone_number
      const existingPhoneUser = await this.userModel.findOne({
        phone_number: user.phone_number,
      });
      if (existingPhoneUser) {
        throw new ConflictException('Phone number is already in use');
      }

      // user.user_id = new ShortUniqueId();
      const createdUser = new this.userModel(user);
      console.log('user created');
      return await createdUser.save();
    } catch (error) {
      console.log(`Error creating user: ${error.message}`);
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }
}
