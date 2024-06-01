import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/posts.dto';
import { PostsService } from './posts.service';
import mongoose from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() post: CreatePostDto) {
    const isValid = mongoose.Types.ObjectId.isValid(post.userId);
    if (!isValid) throw new BadRequestException('Invalid user ID');
    return this.postsService.createPost(post);
  }
}
