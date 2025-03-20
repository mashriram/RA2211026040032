// backend/src/posts/dto/update-post.dto.ts
import {  IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsNumber()
    userId?: number;
}