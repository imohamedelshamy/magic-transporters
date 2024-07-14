import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './mission.entity';
import { MissionService } from './mission.service';
import { TypeOrmMissionRepository } from './repositories/typeorm-mission.repository';
import { MissionController } from './mission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mission])],
  providers: [MissionService, TypeOrmMissionRepository],
  controllers: [MissionController],
  exports: [MissionService],
})
export class MissionModule {}
