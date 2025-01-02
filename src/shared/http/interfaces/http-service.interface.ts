export interface HttpRequest {
  method: string;
  url: string;
  params?: { [key: string]: any };
  data?: any;
  headers?: any;
  attempts?: number;
}

export interface ClientHttpRequest extends Omit<HttpRequest, 'url'> {
  path: string;
}

export interface IHttpService {
  makeRequest<T>(
    request: HttpRequest | ClientHttpRequest,
    errorCodeListToSkipRetry?: string[],
  ): Promise<T>;
}
