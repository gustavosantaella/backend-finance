import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../../users/domain/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { message, data, error } = await this.authService.validateUser(loginDto);
    return { message, data, error };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const {message, data, error} = await this.authService.registerUser(registerDto);
    return { message, data, error};
  }
}
