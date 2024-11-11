// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/user.module'; // 
import { UserEntity } from '../users/domain/entities/user.entity'; // Asegúrate de ajustar la ruta

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService, UserEntity], // Asegúrate que UserService esté disponible aquí
})
export class AuthModule {}
