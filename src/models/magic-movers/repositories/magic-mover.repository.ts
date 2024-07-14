import { CreateMagicMoverDto, UpdateMagicMoverDto } from '../dtos';
import { MagicMover } from '../magic-mover.entity';

export interface IMagicMoverRepository {
  create(mover: CreateMagicMoverDto): Promise<MagicMover>;
  save(mover: UpdateMagicMoverDto): Promise<MagicMover>;
  findAll(): Promise<MagicMover[]>;
  findById(id: number): Promise<MagicMover>;
}
