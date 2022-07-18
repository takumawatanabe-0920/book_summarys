import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummaryCommentController } from './summaryComment.controller';
import { SummaryCommentApplication } from './summaryComment.application';
import { SummaryCommentRepository } from './summaryComment.repository';
import { SummaryComment, SummaryCommentSchema } from './summaryComment.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SummaryComment.name, schema: SummaryCommentSchema },
    ]),
  ],
  controllers: [SummaryCommentController],
  providers: [SummaryCommentApplication, SummaryCommentRepository],
})
export class SummaryCommentModule {}
