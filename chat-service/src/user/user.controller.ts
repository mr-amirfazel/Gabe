/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Param, Delete, Patch, Query, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(JwtAuthGuard)
  @Get()
  search(@Query('username') keyword: string) {
    return this.userService.search(keyword);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(){
    return this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  
}
