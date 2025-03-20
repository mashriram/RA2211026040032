// backend/src/users/users.controller.ts (updated with CRUD)
import { Controller, Get, Post as HttpPost, Body, Param, ParseIntPipe, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpPost()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
      if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
      }
    return user
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto)
      if (!updatedUser) {
          throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
      const result = await this.usersService.remove(id);
      if (result.affected === 0) {
          throw new NotFoundException(`User with ID ${id} not found`);
      }
      return { message: 'User deleted successfully' }
  }
}