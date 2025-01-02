import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService as AxiosHttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { Logger } from '@nestjs/common';
import { HttpService } from '@shared/http/http.service';
import { EnvConfigModule } from '@config/env/env-config.module';

describe('HttpService', () => {
  let service: HttpService;
  let axiosHttpService: AxiosHttpService;
  let request = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EnvConfigModule],
      providers: [
        HttpService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HttpService>(HttpService);
    axiosHttpService = module.get<AxiosHttpService>(AxiosHttpService);

    request = {
      method: 'GET',
      url: 'https://api.example.com/data',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should make a GET request and return data', async () => {
    const result = { data: 'test' };
    jest
      .spyOn(axiosHttpService, 'request')
      .mockImplementation(() => of(result as any));

    const response = await service.makeRequest<{ data: string }>(request);
    expect(response).toEqual(result.data);
  });

  it('should make a GET request with params and return data', async () => {
    const result = { data: 'test' };
    jest
      .spyOn(axiosHttpService, 'request')
      .mockImplementation(() => of(result as any));

    request.params = { id: 1, name: 'test' };

    const response = await service.makeRequest<{ data: string }>(request);
    expect(response).toEqual(result.data);
    expect(axiosHttpService.request).toHaveBeenCalledWith(request);
  });
});
