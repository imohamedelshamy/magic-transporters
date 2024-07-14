import { Controller, Get } from '@nestjs/common';
import { MissionService } from './mission.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('missions')
@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get('/mover-ranks')
  async sort() {
    return this.missionService.sortByMover();
  }
}
