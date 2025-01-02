import { Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class SwaggerConfigService {
  constructor() {}

  setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Template de microsservico - LUCY')
      .setDescription(
        'Projeto de template para todos os microsservicos criados',
      )
      .setVersion('1.0')
      .addApiKey(
        { type: 'apiKey', name: 'x-api-key', in: 'header' },
        'x-api-key',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
}
