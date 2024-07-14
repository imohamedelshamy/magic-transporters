import { MagicItem } from '../magic-item.entity';

export interface MagicItemRepository {
  save(item: MagicItem): Promise<MagicItem>;
  findAll(): Promise<MagicItem[]>;
  findById(id: number): Promise<MagicItem>;
}
