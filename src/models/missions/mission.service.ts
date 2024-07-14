import { Injectable, Inject } from '@nestjs/common';
import { Mission } from './mission.entity';
import { TypeOrmMissionRepository } from './repositories/typeorm-mission.repository';
import { CreateMissionDto } from './dtos';

@Injectable()
export class MissionService {
  constructor(
    @Inject(TypeOrmMissionRepository)
    private readonly missionRepository: TypeOrmMissionRepository,
  ) {}

  async create(createMissionDto: CreateMissionDto): Promise<Mission> {
    return this.missionRepository.create(createMissionDto);
  }

  async findAll(): Promise<Mission[]> {
    return this.missionRepository.findAll();
  }

  async findById(id: number): Promise<Mission> {
    return this.missionRepository.findById(id);
  }

  async sortByMover() {
    return this.missionRepository.sortByMover();
  }
}
