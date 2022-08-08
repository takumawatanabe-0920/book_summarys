import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { renderFile } from 'ejs';
import { NestExpressApplication } from '@nestjs/platform-express';
async function init() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', ''));
  app.engine('html', renderFile);
  app.setViewEngine('html');
  console.log({
    port: config.get('port'),
    dir: __dirname,
    j: join(__dirname, '../public'),
    j2: join(__dirname, '../../public'),
  });
  await app.listen(config.get('port'));
}
init();
