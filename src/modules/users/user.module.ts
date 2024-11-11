// src/modules/users/user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthModule } from '../authentication/auth.module'; // Ajusta según tu estructura

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [TypeOrmModule.forFeature([UserEntity]),
      forwardRef(() => AuthModule), // Usa forwardRef aquí si hay dependencia circular
  ],
  exports: [UserService], // Exporta UserService para su uso en otros módulos
})
export class UserModule {}
