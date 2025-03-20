// backend/src/posts/posts.controller.ts (updated with CRUD)
import { Controller, Get, Post as HttpPost, Body, Param, ParseIntPipe, Put, Delete, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from "./post.entity";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
      const post = await this.postsService.findOne(id);
      if (!post) {
          throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
      const updatedPost = await this.postsService.update(id, updatePostDto);
      if(!updatedPost){
          throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return updatedPost
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
      const result = await this.postsService.remove(id);
      if(result.affected === 0){
          throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return { message: 'Post successfully deleted' };
  }
}