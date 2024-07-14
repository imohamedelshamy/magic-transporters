import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MAGIC_ITEMS } from 'src/database/tables.constant';

@Entity({ name: MAGIC_ITEMS })
export class MagicItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  energyTakes: number;

  @Column()
  CreatedAt: Date;

  @Column()
  UpdatedAt: Date;
}
