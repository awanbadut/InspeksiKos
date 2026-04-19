import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix semua route dengan /api
  app.setGlobalPrefix('api');

  // Aktifkan CORS agar frontend bisa akses backend
  app.enableCors({
    origin: 'http://localhost:3000', // URL frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Aktifkan validasi otomatis untuk semua request
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,      // Buang field yang tidak ada di DTO
    transform: true,      // Auto-convert tipe data
    forbidNonWhitelisted: true, // Error kalau ada field asing
  }));

  // Jalankan di port 5000
  await app.listen(process.env.PORT ?? 5000);
  console.log(`🚀 Backend running on http://localhost:5000`);
  console.log(`📡 API available at http://localhost:5000/api`);
}
bootstrap();