import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SwaggerConfigModule } from '@config/swagger';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigModule } from '@config/env/env-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthModule,
    SwaggerConfigModule,
    EnvConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
