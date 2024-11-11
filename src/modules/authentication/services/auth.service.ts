import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/domain/entities/user.entity';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(loginDto: LoginDto): Promise<{ message: string; data?: { access_token: string; user: UserEntity }; error?: string }> {
        const user = await this.userService.findByUsername(loginDto.username);
        if (!user) {
            return { message: 'Invalid credentials' };
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            return { message: 'Invalid credentials' };
        }
        
        const payload = { firstName: user.firstName, sub: user.id };
        const access_token = this.jwtService.sign(payload);
        
        return { message: 'Login successful', data: { access_token, user } };
    }
    async registerUser(registerDto: RegisterDto): Promise<{ message: string, data?: {access_token: string, user: UserEntity}; error?: string }> {
        const existingUsername = await this.userService.findByUsername(registerDto.username);
        const existingEmail = await this.userService.findByEmail(registerDto.email);
        if (existingUsername || existingEmail) {
          return { message: 'User already exists' };
        }
    
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = new UserEntity();
        user.firstName = registerDto.firstName;
        user.lastName = registerDto.lastName;
        user.username = registerDto.username;
        user.email = registerDto.email;
        user.password = hashedPassword;
    
        await this.userService.create(user);

        const payload = { firstName: user.firstName, sub: user.id };
        const access_token = this.jwtService.sign(payload);

        return { message: 'User registered successfully', data: { access_token, user}}; 
    }    
}
