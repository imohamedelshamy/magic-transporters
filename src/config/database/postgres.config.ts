import { DataSourceOptions, DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const postgresConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'advanced-console',
};

const dataSource = new DataSource(postgresConfig);

export default dataSource;
