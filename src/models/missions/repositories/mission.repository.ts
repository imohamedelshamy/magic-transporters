import { CreateMissionDto } from '../dtos';
import { Mission } from '../mission.entity';

export interface MissionRepository {
  create(mission: CreateMissionDto): Promise<Mission>;
  findAll(): Promise<Mission[]>;
  findById(id: number): Promise<Mission>;
}
