import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { ormConfig } from './config/database.config';
import { ApiIntegrationService } from './modules/api-integration/api-integration.service';
import { CountriesModule } from './modules/countries/countries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRoot(ormConfig()),
    CountriesModule,
  ],
  controllers: [],
  providers: [ApiIntegrationService],
})
export class AppModule {}
