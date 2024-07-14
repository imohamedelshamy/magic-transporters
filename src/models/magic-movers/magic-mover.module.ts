import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicMoverService } from './magic-mover.service';
import { MagicMoverController } from './magic-mover.controller';
import { MagicMover } from './magic-mover.entity';
import { MagicItemModule } from '../magic-items/magic-item.module';
import { MissionModule } from '../missions/mission.module';
import { TypeOrmMagicMoverRepository } from './repositories/typeorm-magic-mover.repository';
import { LoggerModule } from 'src/common/logging/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MagicMover]),
    MagicItemModule,
    MissionModule,
    LoggerModule,
  ],
  providers: [MagicMoverService, TypeOrmMagicMoverRepository],
  controllers: [MagicMoverController],
  exports: [TypeOrmMagicMoverRepository],
})
export class MagicMoverModule {}
