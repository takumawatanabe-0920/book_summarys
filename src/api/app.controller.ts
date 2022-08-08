import { Controller, Render, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index.html')
  root(): any {
    console.log({
      dir: __dirname,
    });
    return { message: 'Hello world!' };
  }
}
