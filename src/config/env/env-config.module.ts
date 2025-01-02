import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { EnvConfigService } from './env-config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({})],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule extends ConfigModule {
  static forRoot(options?: ConfigModuleOptions): Promise<DynamicModule> {
    return super.forRoot({
      ...options,
      envFilePath: [`${process.cwd()}/.env.${process.env.STAGE || 'dev'}`],
    });
  }
}
