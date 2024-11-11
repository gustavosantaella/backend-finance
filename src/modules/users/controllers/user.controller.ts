import { Controller, Get, Query } from '@nestjs/common';
import { BaseController } from 'src/shared/controllers/base.controller';
import { UserService } from '../services/user.service';

@Controller('/users')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Get('/find-by-id')
  public async findById(@Query('id') id: string) {
    const data = await this.userService.findById(id);
    return this.response(data);
  }
}
