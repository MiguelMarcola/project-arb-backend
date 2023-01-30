import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiIntegrationService } from '../api-integration/api-integration.service';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

describe('StudyUsersService', () => {
  let service: CountriesService;

  describe('::create success', () => {
    const mockedRepo = {
      create: jest.fn(() => Promise.resolve()),
      save: jest.fn(() => Promise.resolve()),
      findOne: jest.fn(() => Promise.resolve()),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CountriesService,
          {
            provide: getRepositoryToken(Country),
            useValue: mockedRepo,
          },
          {
            provide: ApiIntegrationService,
            useValue: {
              fechTotalCountries: jest.fn(() => Promise.resolve(1)),
              fechCoutries: jest.fn(() =>
                Promise.resolve({
                  DZ: {
                    name: 'Angola',
                    region: 'Africa',
                    created_at: '2023-01-29T05:41:42.915Z',
                  },
                }),
              ),
            },
          },
        ],
      }).compile();

      service = module.get<CountriesService>(CountriesService);
    });

    afterEach(async () => {
      jest.clearAllMocks();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should be create countries on database', async function () {
      const responseData = await service.create();

      expect(responseData).toBeUndefined();
    });

    describe('::create exception No country has been registered', () => {
      const mockedRepo = {
        findOne: jest.fn(() => Promise.resolve({ id: 'fake_country' })),
      };

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            CountriesService,
            {
              provide: getRepositoryToken(Country),
              useValue: mockedRepo,
            },
            {
              provide: ApiIntegrationService,
              useValue: {
                fechTotalCountries: jest.fn(() => Promise.resolve(1)),
                fechCoutries: jest.fn(() =>
                  Promise.resolve({
                    DZ: {
                      name: 'Angola',
                      region: 'Africa',
                      created_at: '2023-01-29T05:41:42.915Z',
                    },
                  }),
                ),
              },
            },
          ],
        }).compile();

        service = module.get<CountriesService>(CountriesService);
      });

      afterEach(async () => {
        jest.clearAllMocks();
      });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });

      it('should be create countries on database', async function () {
        try {
          await service.create();
        } catch (err) {
          expect(err.message).toBe('No country has been registered');
          expect(err.status).toBe(400);
        }
      });
    });
  });

  describe('::find success', () => {
    const mockedRepo = {
      createQueryBuilder: jest.fn().mockImplementation(() => ({
        andWhere: jest.fn(() => Promise.resolve()),
        skip: jest.fn(() => Promise.resolve()),
        take: jest.fn(() => Promise.resolve()),
        getManyAndCount: jest.fn(() =>
          Promise.resolve([
            [
              {
                id: 1,
                cod: 'DZ',
                name: 'Angola',
                region: 'Africa',
                created_at: '2023-01-29T05:41:42.915Z',
              },
            ],
            1,
          ]),
        ),
      })),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CountriesService,
          {
            provide: getRepositoryToken(Country),
            useValue: mockedRepo,
          },
          ApiIntegrationService,
        ],
      }).compile();

      service = module.get<CountriesService>(CountriesService);
    });

    afterEach(async () => {
      jest.clearAllMocks();
    });

    it('should be list countries without filters', async function () {
      const responseData = await service.find({});

      expect(responseData).toMatchObject({
        data: [
          {
            id: 1,
            cod: 'DZ',
            name: 'Angola',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
        ],
        count: 1,
      });
    });

    it('should be list countries with all filters', async function () {
      const responseData = await service.find({
        skip: 1,
        take: 1,
        cod: '1',
        region: 'Africa',
        name: 'Angola',
      });

      expect(responseData).toMatchObject({
        data: [
          {
            id: 1,
            cod: 'DZ',
            name: 'Angola',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
        ],
        count: 1,
      });
    });
  });

  describe('::populate success', () => {
    const mockedRepo = {
      createQueryBuilder: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockImplementation(() => ({
          addOrderBy: jest.fn().mockImplementation(() => ({
            distinct: jest.fn().mockImplementation(() => ({
              getRawMany: jest
                .fn()
                .mockImplementation(() => [
                  { region: 'Africa' },
                  { region: 'Antarctic' },
                  { region: 'Asia' },
                ]),
            })),
            getRawMany: jest
              .fn()
              .mockImplementation(() => [
                { cod: 'DZ' },
                { cod: 'AO' },
                { cod: 'BJ' },
              ]),
          })),
        })),
      })),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CountriesService,
          {
            provide: getRepositoryToken(Country),
            useValue: mockedRepo,
          },
          ApiIntegrationService,
        ],
      }).compile();

      service = module.get<CountriesService>(CountriesService);
    });

    afterEach(async () => {
      jest.clearAllMocks();
    });

    it('should be to generate a list with the unique elements returned from the database', async function () {
      const responseData = await service.populate();

      expect(responseData).toMatchObject({
        regions: ['Africa', 'Antarctic', 'Asia'],
        cods: ['DZ', 'AO', 'BJ'],
      });
    });
  });
});
