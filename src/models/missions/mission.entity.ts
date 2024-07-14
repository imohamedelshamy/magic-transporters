import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MagicMover } from '../magic-movers/magic-mover.entity';
import { MISSIONS } from 'src/database/tables.constant';

@Entity({ name: MISSIONS })
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  moverId: number;

  @Column('simple-json')
  itemsIds: number[];

  @ManyToOne(() => MagicMover, (mover) => mover.missions)
  mover: MagicMover;
}
