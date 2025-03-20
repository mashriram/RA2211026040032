// backend/src/posts/dto/create-post.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}