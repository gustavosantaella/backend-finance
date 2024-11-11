// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service'; // Asegúrate de ajustar la ruta
import { UserEntity } from '../../users/domain/entities/user.entity'; // Asegúrate de ajustar la ruta

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      return { message: 'Invalid credentials', token:"" };
    }
    return { message: 'Login successful', token:user.access_token};
  }
}
