import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiIntegrationService } from '../api-integration/api-integration.service';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { QueryParamsFindAllDto } from './dto/query-params-findAll.dto';
import { DirectionEnum } from 'src/common/utils/direction.enum';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private repository: Repository<Country>,
    private apiIntegrationService: ApiIntegrationService,
  ) {}

  async create() {
    const totalCountries =
      await this.apiIntegrationService.fechTotalCountries();

    const countries = await this.apiIntegrationService.fechCoutries(
      totalCountries,
    );

    const formateData = [];

    for (const codCountry in countries) {
      if (countries.hasOwnProperty(codCountry)) {
        const isCountryRegistered = await this.findCoutryAlreadyRegistered(
          codCountry,
        );

        if (!isCountryRegistered) {
          formateData.push({
            cod: codCountry,
            name: countries[codCountry].country,
            region: countries[codCountry].region,
          });
        }
      }
    }

    if (!formateData[0]) {
      throw new BadRequestException('No country has been registered');
    }

    const savedContries = this.repository.create(formateData);

    await this.repository.save(savedContries);
  }

  async find({
    take = 10,
    skip = 0,
    cod,
    name,
    region,
    orderBy,
    direction = DirectionEnum.ascending,
  }: QueryParamsFindAllDto) {
    const query = this.repository.createQueryBuilder('country');

    if (cod) {
      query.andWhere('country.cod= :cod', { cod });
    }

    if (name) {
      query.andWhere('country.name Ilike :name', { name: `%${name}%` });
    }

    if (region) {
      query.andWhere('country.region= :region', { region });
    }

    query.skip(skip);
    query.take(take);

    switch (orderBy) {
      case 'cod':
        query.addOrderBy('cod', direction);
        break;

      case 'name':
        query.addOrderBy('name', direction);
        break;

      case 'region':
        query.addOrderBy('region', direction);
        break;

      case 'id':
        query.addOrderBy('id', direction);
        break;

      default:
        query.addOrderBy('id', direction);
        break;
    }

    const [response, results] = await query.getManyAndCount();

    return {
      data: response,
      count: results,
    };
  }

  async populate() {
    const queryAllRegions = await this.repository
      .createQueryBuilder('country')
      .select('country.region', 'region')
      .addOrderBy('country.region', 'ASC')
      .distinct(true)
      .getRawMany();

    const queryAllCods = await this.repository
      .createQueryBuilder('country')
      .select('country.cod', 'cod')
      .addOrderBy('country.region', 'ASC')
      .getRawMany();

    const allRegions = queryAllRegions.map((item) => item.region);

    const allCods = queryAllCods.map((item) => item.cod);

    return {
      regions: allRegions,
      cods: allCods,
    };
  }

  private async findCoutryAlreadyRegistered(codCountry: string) {
    const country = await this.repository.findOne({
      where: { cod: codCountry },
    });

    return country ? true : false;
  }
}
