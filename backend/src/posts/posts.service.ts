// backend/src/posts/posts.service.ts (updated with CRUD)
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
      const { userId, content } = createPostDto;
      const user = await this.usersRepository.findOneBy({id: userId});

      if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
      }
    const newPost = this.postsRepository.create({
        content,
        userId: user.id,  // Set the userId
        user,           // Set the user relation
    });

    return this.postsRepository.save(newPost);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'], // Load the user relation
    });
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne({
        where: { id },
        relations: ['user'],
    });
  }

    update(id: number, updatePostDto: UpdatePostDto): Promise<UpdateResult> {

        return this.postsRepository.update(id, updatePostDto);
    }

    async remove(id: number): Promise<DeleteResult> {
        return this.postsRepository.delete(id);

    }
}