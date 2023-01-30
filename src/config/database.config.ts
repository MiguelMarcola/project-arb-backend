import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function ormConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'local' ? true : false,
    entities: [
      'dist/**/entity/*.entity{.ts,.js}',
      'dist/**/entities/*.entity{.ts,.js}',
    ],
  };
}
