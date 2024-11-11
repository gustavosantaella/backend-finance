import { Module } from '@nestjs/common';
import { AppController } from './example/app.controller';
import { AppService } from './example/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE || 'mysql',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    } as any),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
