import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { ApiIntegrationService } from './api-integration.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CountriesService', () => {
  let service: ApiIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiIntegrationService],
    }).compile();

    service = module.get<ApiIntegrationService>(ApiIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('::fechTotalCountries', () => {
    it('should be fech api', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          status: 'OK',
          'status-code': 200,
          version: '1.0',
          access: 'public',
          data: [],
        },
        status: 200,
        statusText: 'Ok',
        headers: {
          'x-total': 50,
        },
        config: {},
      });

      const responseData = await service.fechTotalCountries();
      expect(responseData).toBe(50);
    });

    it('exception Integration API is not runnig', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: 404,
          statusText: 'Error',
          headers: {},
          config: {},
        },
      });

      try {
        await service.fechTotalCountries();
      } catch (err) {
        expect(err.message).toBe('Integration API is not runnig');
        expect(err.status).toBe(502);
      }
    });

    it('exception connection error', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        data: undefined,
      });

      try {
        await service.fechTotalCountries();
      } catch (err) {
        expect(err.message).toBe('Integration API is not runnig');
        expect(err.status).toBe(502);
      }
    });
  });

  describe('::fechCoutries', () => {
    it('should be fech api', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          status: 'OK',
          'status-code': 200,
          version: '1.0',
          access: 'public',
          data: {
            DZ: {
              country: 'Algeria',
              region: 'Africa',
            },
            AO: {
              country: 'Angola',
              region: 'Africa',
            },
          },
        },
        status: 200,
        statusText: 'Ok',
        headers: {
          'x-total': 50,
        },
        config: {},
      });

      const responseData = await service.fechCoutries(2);
      expect(responseData).toMatchObject({
        DZ: {
          country: 'Algeria',
          region: 'Africa',
        },
        AO: {
          country: 'Angola',
          region: 'Africa',
        },
      });
    });

    it('exception Integration API is not runnig', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: 404,
          statusText: 'Error',
          headers: {},
          config: {},
        },
      });

      try {
        await service.fechCoutries(2);
      } catch (err) {
        expect(err.message).toBe('Integration API is not runnig');
        expect(err.status).toBe(502);
      }
    });

    it('exception connection error', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        data: undefined,
      });

      try {
        await service.fechCoutries(2);
      } catch (err) {
        expect(err.message).toBe('Integration API is not runnig');
        expect(err.status).toBe(502);
      }
    });
  });
});
