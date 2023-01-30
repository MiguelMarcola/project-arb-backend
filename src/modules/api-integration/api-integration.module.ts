import { Module } from '@nestjs/common';
import { ApiIntegrationService } from './api-integration.service';

@Module({
  providers: [ApiIntegrationService],
  exports: [ApiIntegrationService],
})
export class ApiIntegrationModule {}
