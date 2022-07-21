import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummaryController } from './summary.controller';
import { SummaryApplication } from './summary.application';
import { SummaryRepository } from './summary.repository';
import { Summary, SummarySchema } from './summary.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }]),
  ],
  controllers: [SummaryController],
  providers: [SummaryApplication, SummaryRepository],
})
export class SummaryModule {}
