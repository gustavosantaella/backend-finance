import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/domain/entities/user.entity';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<{ access_token: string; user: UserEntity } | null> {
        const user = await this.userService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = {firstName: user.firstName, sub:user.id};
            return {
                access_token: this.jwtService.sign(payload), user,
            };
        }
        return null;
    }
    async registerUser(registerDto: RegisterDto): Promise<void> {
        const user = await this.userService.findByUsername(registerDto.username);

        if(user){
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = new UserEntity();
        newUser.firstName = registerDto.firstName;
        newUser.lastName = registerDto.lastName;
        newUser.username = registerDto.username;
        newUser.email = registerDto.email;
        newUser.password = hashedPassword;
    
        await this.userService.create(newUser);
    }    
}
