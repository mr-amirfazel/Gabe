/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Param, Delete, Patch, Query} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  search(@Query('keyword') keyword: string) {
    return this.userService.search(keyword);
  }

  @Get()
  findAll(){
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  
}
