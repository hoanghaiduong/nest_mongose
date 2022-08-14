import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
   app.setGlobalPrefix('api/v1');
  const port = process.env.PORT || 8800;
  const config = new DocumentBuilder()
    .setTitle('SMART TOURIST')
    .setDescription('API WITH Smartourist')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  await app.listen(port).then(() => {
    console.log(`Listening on port ${port}`);
  }).catch(err => {
    console.log(err);
  })
}
bootstrap();
