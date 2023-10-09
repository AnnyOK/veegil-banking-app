import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomRequest } from './auth/custom.request.interface';
// dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Replace with your allowed origin(s)
    methods: '*',
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  });

  app.use((req: CustomRequest, _, next) => {
    req.user = null;
    next();
  });
  const config = new DocumentBuilder()
    .setTitle('Veegil banking app')
    .setDescription('Api documentation for veegil banking app')
    .setVersion('1.0')
    .addTag('Api')
    .addBearerAuth() // Add Bearer token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(process.env.PORT, 'PORT');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
