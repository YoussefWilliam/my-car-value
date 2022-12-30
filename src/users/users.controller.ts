import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUser } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userServices: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    this.userServices.create(email, password);
  }

  @Get()
  listAllUsers() {
    return this.userServices.findAll();
  }

  @Get()
  getUserByEmail(@Query('email') email: string) {
    return this.userServices.find(email);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userServices.findOne(id);
    if (!user) {
      throw new NotFoundException('user is not found');
    }
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUser) {
    return this.userServices.update(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userServices.delete(id);
  }
}
