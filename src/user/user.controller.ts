import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('search')
  getUser(): string {
    return 'This is search user API';
  }

  @Patch('update')
  updateUser(): string {
    return 'This is update user API';
  }

  @Post('insert')
  insertUser(): string {
    return 'This is insert user API';
  }

  @Delete('delete')
  deleteUser(): string {
    return 'This is delete user API';
  }
}
