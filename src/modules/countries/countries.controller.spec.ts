import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

describe('UserController', () => {
  let controller: CountriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        {
          provide: CountriesService,
          useValue: {
            create: jest.fn(() => ({})),
            find: jest.fn(() => ({})),
            populate: jest.fn(() => ({})),
          },
        },
      ],
    }).compile();
    controller = module.get(CountriesController);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send to service ::create', async function () {
    const responseController = await controller.create();

    expect(responseController).toBeDefined();
  });

  it('should send to service ::find', async function () {
    const responseController = await controller.find({});

    expect(responseController).toBeDefined();
  });

  it('should send to service ::populate', async function () {
    const responseController = await controller.populate();

    expect(responseController).toBeDefined();
  });
});
