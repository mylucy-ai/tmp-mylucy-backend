import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from '@nestjs/terminus';
import { HealthController } from '../../src/health/health.controller';
import { AppHealthIndicator } from '../../src/health/app.health';

describe('HealthController', () => {
  let sut: HealthController;
  const healthCheckMock = {
    status: 'ok',
    info: {
      AppHealthIndicator: {
        status: 'up',
      },
    },
    error: {},
    details: {
      AppHealthIndicator: {
        status: 'up',
      },
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn().mockReturnValue(healthCheckMock),
          },
        },
        {
          provide: AppHealthIndicator,
          useValue: {
            isHealthy: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();
    sut = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return OK status', () => {
      expect(sut.check()).toStrictEqual(healthCheckMock);
    });
  });
});
