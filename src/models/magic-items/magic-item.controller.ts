import { Controller, Post, Body } from '@nestjs/common';
import { MagicItemService } from './magic-item.service';
import { CreateMagicItemDto } from './dtos/create-magic-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('magic-items')
@Controller('magic-items')
export class MagicItemController {
  constructor(private readonly magicItemService: MagicItemService) {}

  @Post()
  async addMagicItem(@Body() createMagicItemDto: CreateMagicItemDto) {
    return this.magicItemService.addMagicItem(createMagicItemDto);
  }
}
