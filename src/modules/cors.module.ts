import { Module } from '@nestjs/common';
import { CORS_MODULE_OPTIONS } from './cors.constants';
import { CorsOptionsFactory, CorsModule } from '@nestjs/cors';

export class CorsConfiguration implements CorsOptionsFactory {
  createCorsOptions(): CorsOptionsFactory {
    return {
      origin: ['http://localhost:4200'], // Reemplaza con la URL de tu aplicación Angular
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
  }
}

@Module({
  providers: [
    {
      provide: CORS_MODULE_OPTIONS,
      useClass: CorsConfiguration,
    },
  ],
  exports: [CorsModule],
  imports: [CorsModule],
})
export class CORSModule {}