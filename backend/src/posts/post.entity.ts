 // backend/src/posts/post.entity.ts (updated relationship)
 import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
 import { User } from '../users/user.entity';

 @Entity()
 export class Post {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   content: string;

   @ManyToOne(() => User, user => user.posts)
   @JoinColumn({ name: 'userId' }) // Explicitly define the join column
   user: User;

   @Column()
   userId: number; // Keep the userId column
 }