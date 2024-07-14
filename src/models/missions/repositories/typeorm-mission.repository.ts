import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Mission } from '../mission.entity';
import { MissionRepository } from './mission.repository';
import { CreateMissionDto } from '../dtos';

export class TypeOrmMissionRepository implements MissionRepository {
  constructor(
    @InjectRepository(Mission)
    private readonly repository: Repository<Mission>,
  ) {}

  async create(mission: CreateMissionDto): Promise<Mission> {
    const newMission = this.repository.create(mission);
    newMission.moverId = mission.moverId;
    newMission.itemsIds = mission.itemsIds;
    newMission.status = 'completed';
    return this.repository.save(mission);
  }

  async findAll(): Promise<Mission[]> {
    return this.repository.find({ relations: ['mover'] });
  }

  async findById(id: number): Promise<Mission> {
    return this.repository.findOne({ where: { id }, relations: ['mover'] });
  }
}
