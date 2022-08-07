import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Controller, Get, Res, HttpStatus } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('/_status/healthCheck')
  healthCheck(@Res() res) {
    if (this.connection.readyState === 1) {
      res.status(HttpStatus.OK).json({ db: { status: 'up' } });
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ db: { status: 'down' } });
    }
  }
}
