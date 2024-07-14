import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicItemService } from './magic-item.service';
import { MagicItemController } from './magic-item.controller';
import { MagicItem } from './magic-item.entity';
import { TypeOrmMagicItemRepository } from './repositories/typeorm-magic-item.repository';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([MagicItem]), LoggerModule],
  providers: [MagicItemService, TypeOrmMagicItemRepository],
  controllers: [MagicItemController],
  exports: [MagicItemService],
})
export class MagicItemModule {}
