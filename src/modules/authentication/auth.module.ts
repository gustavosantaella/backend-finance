import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/user.module';
import { UserEntity } from '../users/domain/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, UserEntity],
})
export class AuthModule {}
