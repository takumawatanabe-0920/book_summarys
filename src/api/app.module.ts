import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './categories/category.module';
import { SubCategoryModule } from './subCategories/subCategory.module';
import { SummaryModule } from './summaries/summary.module';
import { UserModule } from './users/user.module';
import { CategoryCommand } from './categories/category.command';
import { FavoriteModule } from './favorites/favorite.module';
import { HealthCheckModule } from './healthChecks/healthCheck.module';
import { AuthModule } from './auth/auth.module';
import { CommandModule } from 'nestjs-command';
import * as config from 'config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
@Module({
  imports: [
    MongooseModule.forRoot(
      config.get('mongodb.uri'),
      config.get('mongodb.options'),
    ),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../..', 'public'),
      exclude: ['/api*'],
      serveStaticOptions: {
        setHeaders: (res, path) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
          );
        },
      },
    }),
    CategoryModule,
    FavoriteModule,
    SubCategoryModule,
    SummaryModule,
    UserModule,
    AuthModule,
    CommandModule,
    HealthCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategoryCommand],
})
export class AppModule {}
