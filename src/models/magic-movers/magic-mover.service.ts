import { Injectable, Inject, Param, BadRequestException } from '@nestjs/common';
import { MagicMover } from './magic-mover.entity';
import { QuestStateEnum } from './enums';
import { MagicItem } from '../magic-items/magic-item.entity';
import { MagicItemService } from '../magic-items/magic-item.service';
import { MissionService } from '../missions/mission.service';
import { CreateMagicMoverDto, LoadItemsDto } from './dtos';
import { TypeOrmMagicMoverRepository } from './repositories/typeorm-magic-mover.repository';
import { LogService } from 'src/common/logging/logger.service';
import { CreateMissionDto } from '../missions/dtos';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class MagicMoverService {
  constructor(
    @Inject(TypeOrmMagicMoverRepository)
    private readonly moverRepository: TypeOrmMagicMoverRepository,
    private readonly magicItemService: MagicItemService,
    private readonly missionService: MissionService,
    private readonly logService: LogService,
  ) {}

  async addMagicMover(mover: CreateMagicMoverDto): Promise<MagicMover> {
    this.logService.log(
      `Magic Mover ${mover.name} created with weight limit ${mover.weightLimit} and energy capacity ${mover.energyCapacity}`,
    );
    return this.moverRepository.create(mover);
  }

  async findOne(@Param('id') id: number) {
    return this.moverRepository.findById(id);
  }

  async loadItems(
    moverId: number,
    itemsIds: LoadItemsDto,
  ): Promise<MagicMover> {
    const mover = await this.moverRepository.findById(moverId);
    const items = await Promise.all(
      itemsIds.itemsIds.map((id) => this.magicItemService.findById(id)),
    );

    const checkWeight = this.isWeightLimitExceeded(mover, items);
    if (!checkWeight) {
      throw new BadRequestException('Weight limit exceeded');
    }

    const checkEnergy = this.isEnergyExceeded(mover, items);
    if (!checkEnergy) {
      throw new BadRequestException('Not enough energy');
    }

    mover.magicItemsIds = itemsIds.itemsIds;
    mover.questState = QuestStateEnum.LOADING;

    this.logService.log(`Magic Mover ${mover.name} is loading items`);

    return this.moverRepository.save(mover);
  }

  async rest(moverId: number): Promise<MagicMover> {
    const mover = await this.moverRepository.findById(moverId);
    mover.questState = QuestStateEnum.RESTING;

    await this.rechargeEnergy(mover);

    this.logService.log(`Magic Mover ${mover.name} is resting`);
    return this.moverRepository.save(mover);
  }

  async startMission(moverId: number): Promise<void> {
    const mover = await this.moverRepository.findById(moverId);
    mover.questState = QuestStateEnum.ON_A_MISSION;

    this.logService.log(`Magic Mover ${mover.name} is on a mission`);
    await this.moverRepository.save(mover);
  }

  @Transactional()
  async endMission(moverId: number): Promise<MagicMover> {
    const mover = await this.moverRepository.findById(moverId);

    const missionData: CreateMissionDto = {
      moverId: mover.id,
      itemsIds: mover.magicItemsIds,
      status: 'completed',
    };
    await this.missionService.create(missionData);

    mover.magicItemsIds = [];
    mover.questState = QuestStateEnum.RESTING;

    this.logService.log(`Magic Mover ${mover.name} has completed the mission`);

    this.logService.log(
      `Changing the Magic Mover ${mover.name} to resting state`,
    );

    console.log('🚀 ~ MagicMoverService ~ endMission ~ mover:', mover);
    return this.moverRepository.save(mover);
  }

  async rechargeEnergy(mover: MagicMover): Promise<void> {
    const delayTime = this.rechargeEnergyTime(
      mover.currentEnergy,
      mover.energyCapacity,
    );

    await this.waitForDelay(delayTime, async () => {
      mover.currentEnergy = mover.energyCapacity;
      await this.moverRepository.save(mover);
    });
  }

  rechargeEnergyTime(currentEnergy: number, energyCapacity: number): number {
    return (energyCapacity - currentEnergy) * 1000;
  }

  async waitForDelay(
    delay: number,
    action: () => Promise<void>,
  ): Promise<void> {
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        await action();
        resolve();
      }, delay);
    });
  }

  isWeightLimitExceeded(mover: MagicMover, items: MagicItem[]): boolean {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

    return totalWeight < mover.weightLimit;
  }

  isEnergyExceeded(mover: MagicMover, items: MagicItem[]): boolean {
    const totalEnergy = items.reduce((sum, item) => sum + item.energyTakes, 0);
    return totalEnergy < mover.currentEnergy;
  }
}
