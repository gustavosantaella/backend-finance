// src/modules/authentication/services/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/domain/entities/user.entity'; 
import { UserService } from '../../users/services/user.service'; 

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(firstName: string, password: string): Promise<UserEntity | null> {
        const user = await this.userService.findByFirstName(firstName); // Cambia a findByFirstName
        if (user && user.password === password) { // Aquí deberías usar bcrypt para comparar contraseñas
            return user;
        }
        return null;
    }
}
