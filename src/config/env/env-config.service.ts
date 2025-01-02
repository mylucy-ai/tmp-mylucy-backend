import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getServerPort(): number {
    return Number(this.configService.get<number>('SERVER_PORT'));
  }

  getStage(): string {
    return String(this.configService.get<string>('STAGE'));
  }

  getHttpMaxAttempts(): number {
    return Number(this.configService.get<number>('HTTP_MAX_ATTEMPTS'));
  }

  getHttpMaxRedirects(): number {
    return Number(this.configService.get<number>('HTTP_MAX_REDIRECTS'));
  }

  getHttpTimeout(): number {
    return Number(this.configService.get<number>('HTTP_TIMEOUT'));
  }

  getHttpRetryDelay(): number {
    return Number(this.configService.get<number>('HTTP_RETRY_DELAY'));
  }
}
