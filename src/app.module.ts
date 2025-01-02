import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SwaggerConfigModule } from '@config/swagger';

@Module({
  imports: [HealthModule, SwaggerConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
