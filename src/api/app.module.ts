import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as config from 'config';
@Module({
  imports: [
    MongooseModule.forRoot(
      config.get('mongodb.uri'),
      config.get('mongodb.options'),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
