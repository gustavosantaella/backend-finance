// src/user/user.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BaseController } from 'src/shared/controllers/base.controller';
import { UserService } from '../services/user.service';
import { UserEntity } from '../domain/entities/user.entity'; // Asegúrate de ajustar la ruta según tu estructura

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

  @Get() // Ruta para obtener todos los usuarios
  public async findAll() {
    const data = await this.userService.findAll();
    return this.response(data);
  }

  @Post() // Ruta para crear un nuevo usuario
  public async create(@Body() userData: UserEntity) {
    const data = await this.userService.create(userData);
    return this.response(data);
  }
}
