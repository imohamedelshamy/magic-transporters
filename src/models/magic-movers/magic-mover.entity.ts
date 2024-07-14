import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { QuestStateEnum } from './enums';
import { Mission } from '../missions/mission.entity';
import { MAGIC_MOVERS } from 'src/database/tables.constant';

@Entity({ name: MAGIC_MOVERS })
export class MagicMover {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weightLimit: number;

  @Column()
  energyCapacity: number;

  @Column()
  currentEnergy: number;

  @Column('simple-json')
  magicItemsIds: number[];

  @Column()
  CreatedAt: Date;

  @Column()
  UpdatedAt: Date;

  @Column({ default: 'resting', enum: QuestStateEnum })
  questState: QuestStateEnum;

  @OneToMany(() => Mission, (mission) => mission.mover)
  missions: Mission[];
}
