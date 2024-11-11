import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/domain/entities/user.entity';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(firstName: string, password: string): Promise<{ access_token: string; user: UserEntity } | null> {
        const user = await this.userService.findByFirstName(firstName); // Cambia a findByFirstName
        if (user && user.password === password) {
            const payload = {firstName: user.firstName, sub:user.id};
            return {
                access_token: this.jwtService.sign(payload), user,
            };
        }
        return null;
    }
}
