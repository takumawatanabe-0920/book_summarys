import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrowsingController } from './browsing.controller';
import { BrowsingApplication } from './browsing.application';
import { BrowsingRepository } from './browsing.repository';
import { Browsing, BrowsingSchema } from './browsing.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Browsing.name, schema: BrowsingSchema },
    ]),
  ],
  controllers: [BrowsingController],
  providers: [BrowsingApplication, BrowsingRepository],
})
export class BrowsingModule {}
