import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserOptional, UserResponse } from './user.interface';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check')
  test(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'This is a test API',
    });
  }

  @Get('search')
  getUser(@Query() querystring): UserResponse {
    return this.userService.findUser(querystring);
  }

  @Patch('update')
  updateUser(
    @Query('username') username: string,
    @Body() requestBody: UserOptional,
  ): UserResponse {
    return this.userService.updateUser(username, requestBody);
  }

  @Post('post')
  insertUser(@Body() requestBody: User): UserResponse {
    return this.userService.insertUser(requestBody);
  }

  @Delete('delete')
  deleteUser(@Query('username') username: string): UserResponse {
    return this.userService.deleteUser(username);
  }
}
