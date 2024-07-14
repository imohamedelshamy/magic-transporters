import { Injectable, Inject } from '@nestjs/common';
import { MagicItem } from './magic-item.entity';
import { CreateMagicItemDto } from './dtos';
import { LogService } from 'src/common/logging/logger.service';
import { TypeOrmMagicItemRepository } from './repositories/typeorm-magic-item.repository';

@Injectable()
export class MagicItemService {
  constructor(
    @Inject(TypeOrmMagicItemRepository)
    private readonly itemRepository: TypeOrmMagicItemRepository,
    private readonly logService: LogService,
  ) {}

  async addMagicItem(
    createMagicItemDto: CreateMagicItemDto,
  ): Promise<MagicItem> {
    const magicItem = new MagicItem();
    magicItem.name = createMagicItemDto.name;
    magicItem.weight = createMagicItemDto.weight;

    // Assuming that Energy takes is 5 times the weight
    magicItem.energyTakes = createMagicItemDto.weight * 5;

    this.logService.log(
      `Magic Item ${magicItem.name} created with weight ${magicItem.weight} and energy takes ${magicItem.energyTakes} \n\n`,
    );
    return this.itemRepository.save(magicItem);
  }

  async findById(id: number): Promise<MagicItem> {
    return this.itemRepository.findById(id);
  }
}
