// backend/src/app.module.ts (updated for TypeORM)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { AppController } from './app.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Post],
      synchronize: true, // Use migrations in production
    }),
    UsersModule,
    PostsModule,
  ],
    controllers: [AppController],
})
export class AppModule {}