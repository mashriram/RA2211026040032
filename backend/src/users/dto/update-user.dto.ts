// backend/src/users/dto/update-user.dto.ts
import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDto{
    @IsOptional()
    @IsString()
    username?: string;
}