import { Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { QueryParamsFindAllDto } from './dto/query-params-findAll.dto';

@Controller('/api/v1/countries')
@ApiTags('Countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiOkResponse({
    description: 'Some country has been registered',
  })
  @ApiBadRequestResponse({
    description:
      'All countries returned from the integration api are already registered in the base',
    schema: {
      example: {
        timestamp: '2023-01-29T02:31:32.051Z',
        path: '/api/v1/countries',
        error: {
          statusCode: 400,
          message: 'No country has been registered',
          error: 'Bad Request',
        },
      },
    },
  })
  @ApiBadGatewayResponse({
    description: 'Integration API is not running',
    schema: {
      example: {
        timestamp: '2023-01-29T02:31:32.051Z',
        path: '/api/v1/countries',
        error: {
          statusCode: 502,
          message: 'Integration API is not runnig',
          error: 'Bad Gateway',
        },
      },
    },
  })
  create() {
    return this.countriesService.create();
  }

  @Get()
  @ApiOkResponse({
    description: 'List countries with pagination',
    schema: {
      example: {
        data: [
          {
            id: 1,
            cod: 'DZ',
            name: 'Algeria',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 2,
            cod: 'AO',
            name: 'Angola',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 3,
            cod: 'BJ',
            name: 'Benin',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 4,
            cod: 'BW',
            name: 'Botswana',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 5,
            cod: 'BF',
            name: 'Burkina Faso',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 6,
            cod: 'BI',
            name: 'Burundi',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 7,
            cod: 'CV',
            name: 'Cabo Verde',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 8,
            cod: 'CM',
            name: 'Cameroon',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 9,
            cod: 'CF',
            name: 'Central African Republic (the)',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
          {
            id: 10,
            cod: 'TD',
            name: 'Chad',
            region: 'Africa',
            created_at: '2023-01-29T05:41:42.915Z',
          },
        ],
        count: 249,
      },
    },
  })
  find(@Query() data: QueryParamsFindAllDto) {
    return this.countriesService.find(data);
  }

  @Get('populate-filters')
  @ApiOkResponse({
    description:
      'Returns the unique values of the region field and all country codes',
    schema: {
      example: {
        regions: [
          'Africa',
          'Antarctic',
          'Asia',
          'Central America',
          'Europe',
          'Middle East',
          'North America',
          'Oceania',
          'South America',
          'The Caribbean',
        ],
        cods: ['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD'],
      },
    },
  })
  populate() {
    return this.countriesService.populate();
  }
}
