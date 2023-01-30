import { Injectable } from '@nestjs/common';
import { BadGatewayException } from '@nestjs/common/exceptions';
import axios from 'axios';

@Injectable()
export class ApiIntegrationService {
  async fechTotalCountries() {
    try {
      const total: number = await axios
        .get('https://api.first.org/data/v1/countries?limit=0')
        .then((response) => response.headers['x-total']);

      return total;
    } catch {
      throw new BadGatewayException('Integration API is not runnig');
    }
  }

  async fechCoutries(limit: number) {
    try {
      const { data } = await axios
        .get(`https://api.first.org/data/v1/countries?limit=${limit}`)
        .then((response) => response.data);

      return data;
    } catch {
      throw new BadGatewayException('Integration API is not runnig');
    }
  }
}
