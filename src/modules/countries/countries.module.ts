import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { ApiIntegrationModule } from '../api-integration/api-integration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), ApiIntegrationModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
