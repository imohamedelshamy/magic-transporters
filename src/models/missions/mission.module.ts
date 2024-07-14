import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './mission.entity';
import { MissionService } from './mission.service';
import { TypeOrmMissionRepository } from './repositories/typeorm-mission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Mission])],
  providers: [MissionService, TypeOrmMissionRepository],
  exports: [MissionService],
})
export class MissionModule {}
