import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { MagicMoverService } from './magic-mover.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateMagicMoverDto, LoadItemsDto } from './dtos';

@ApiTags('magic-movers')
@Controller('magic-movers')
export class MagicMoverController {
  constructor(private readonly magicMoverService: MagicMoverService) {}

  @Post()
  async create(@Body() createMagicMoverDto: CreateMagicMoverDto) {
    return this.magicMoverService.addMagicMover(createMagicMoverDto);
  }

  @ApiBody({
    type: LoadItemsDto,
  })
  @Patch(':id/load-items')
  async addItems(@Param('id') id: number, @Body() loadItemsDto: LoadItemsDto) {
    return this.magicMoverService.loadItems(id, loadItemsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.magicMoverService.findOne(id);
  }

  @Post(':id/rest')
  async rest(@Param('id') id: number) {
    return this.magicMoverService.rest(id);
  }

  @Post(':id/start')
  async startMission(@Param('id') id: number) {
    return this.magicMoverService.startMission(id);
  }

  @Post(':id/end')
  async endMission(@Param('id') id: number) {
    return this.magicMoverService.endMission(id);
  }
}
