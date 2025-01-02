import { Injectable, Logger } from '@nestjs/common';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, retry, tap, timer } from 'rxjs';
import { HttpRequest, IHttpService } from './interfaces/http-service.interface';
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error';
import { EnvConfigService } from '@config/env/env-config.service';

@Injectable()
export class HttpService implements IHttpService {
  constructor(
    private readonly httpService: AxiosHttpService,
    private readonly envConfigService: EnvConfigService,
    private readonly logger: Logger,
  ) {}

  async makeRequest<T>(
    request: HttpRequest,
    errorCodeListToSkipRetry?: string[],
  ): Promise<T> {
    this.logger.log(`START REQUEST FOR: ${request.url}`, HttpService.name);
    return lastValueFrom<T>(
      this.httpService.request<T>(request).pipe(
        tap({
          error: (error) => {
            this.logger.warn(
              `REQUEST FAILED - ${JSON.stringify({ url: request.url, error: error?.response?.data })}`,
              HttpService.name,
            );
          },
        }),
        retry({
          /**
           * The number of times to retry failed requests
           *   */
          count: this.envConfigService.getHttpMaxAttempts(),
          /**
           * The number of milliseconds before starting the first retry
           *     */
          delay: (error) => {
            const errorData = error?.response?.data;
            if (
              errorData.errors &&
              errorCodeListToSkipRetry.includes(errorData.errors[0]?.code)
            ) {
              throw error;
            }
            return timer(this.envConfigService.getHttpRetryDelay());
          },
        }),
        map((res) => {
          this.logger.log(
            `FINISH REQUEST FOR: ${request.url}`,
            HttpService.name,
          );
          return res.data;
        }),
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );
  }
}
