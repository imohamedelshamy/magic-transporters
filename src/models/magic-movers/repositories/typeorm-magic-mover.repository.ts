import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicMover } from '../magic-mover.entity';
import { IMagicMoverRepository } from './magic-mover.repository';
import { CreateMagicMoverDto, UpdateMagicMoverDto } from '../dtos';
import { QuestStateEnum } from '../enums';

export class TypeOrmMagicMoverRepository implements IMagicMoverRepository {
  constructor(
    @InjectRepository(MagicMover)
    private readonly repository: Repository<MagicMover>,
  ) {}

  async create(mover: CreateMagicMoverDto): Promise<MagicMover> {
    const newMover = this.repository.create(mover);
    newMover.questState = QuestStateEnum.RESTING; // default state
    return this.repository.save(newMover);
  }

  async save(mover: UpdateMagicMoverDto): Promise<MagicMover> {
    return this.repository.save(mover);
  }

  async findAll(): Promise<MagicMover[]> {
    return this.repository.find({ relations: ['missions'] });
  }

  async findById(id: number): Promise<MagicMover> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
