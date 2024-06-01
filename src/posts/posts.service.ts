import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/posts.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createPost({ userId, ...post }: CreatePostDto) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');
    const newPost = new this.postModel(post);
    const savedPost = await newPost.save();
    await user.updateOne({ $push: { posts: savedPost._id } }).exec();
    return savedPost;
  }

  findPostById() {}
}
