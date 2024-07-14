import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MagicItem } from '../magic-item.entity';
import { MagicItemRepository } from './magic-item.repository';

export class TypeOrmMagicItemRepository implements MagicItemRepository {
  constructor(
    @InjectRepository(MagicItem)
    private readonly repository: Repository<MagicItem>,
  ) {}

  async save(item: MagicItem): Promise<MagicItem> {
    return this.repository.save(item);
  }

  async findAll(): Promise<MagicItem[]> {
    return this.repository.find({
      relations: ['movers'],
      select: ['id', 'name', 'weight', 'energyTakes'],
    });
  }

  async findById(id: number): Promise<MagicItem> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
