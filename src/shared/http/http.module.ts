import { Global, Logger, Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [Logger, HttpService],
  exports: [HttpService],
})
export class HttpCoreModule {}
