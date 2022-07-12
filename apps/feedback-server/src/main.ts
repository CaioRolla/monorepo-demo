import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
const cors = require('cors');
const cloneBuffer = require('clone-buffer');
import { AppModule } from './app/app.module';
// import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const globalPrefix = 'api';

  app.use(cors());
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const rawBodyBuffer = (req: any, res, buf, encoding) => {
    // important to store rawBody for Stripe signature verification
    if (req.headers['stripe-signature'] && Buffer.isBuffer(buf)) {
      req.rawBody = cloneBuffer(buf);
    }
    return true;
  };

  app.use(urlencoded({ verify: rawBodyBuffer, limit: '50mb', extended: true }));
  app.use(
    json({
      limit: '50mb',
      verify: rawBodyBuffer,
    })
  );

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {});
}

bootstrap();
