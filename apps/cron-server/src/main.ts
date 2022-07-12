import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
const cors = require('cors');
const cloneBuffer = require('clone-buffer');
import { AppModule } from './app/app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const globalPrefix = 'api';

  app.use(cors());
  // app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.use('/api/assets', express.static(join(__dirname, 'assets')));

  app.use(
    json({
      verify: (req: any, res, buf, encoding) => {
        // important to store rawBody for Stripe signature verification
        if (req.headers['stripe-signature'] && Buffer.isBuffer(buf)) {
          req.rawBody = cloneBuffer(buf);
        }
        return true;
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Beew API reference docs')
    .setDescription("Explore Beew's API reference.")
    .setContact('Support', '', 'caio.rolla@beew.io')
    .addServer('https://beew.io/api', 'Beew API')
    .setVersion('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API reference docs - Beew',
    customfavIcon: 'https://beew.io/assets/favicons/favicon-32x32.png',
    customCss: `
    .topbar-wrapper img {content:url(\'/api/assets/logos/icon-round.png\'); width:50px; height:auto;}
    .swagger-ui .topbar { background-color: white; }
    `,
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      supportedSubmitMethods: [],
    },
  });

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {});
}

bootstrap();
