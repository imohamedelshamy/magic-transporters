import { Module } from '@nestjs/common';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../config/database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return addTransactionalDataSource(dataSource);
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
