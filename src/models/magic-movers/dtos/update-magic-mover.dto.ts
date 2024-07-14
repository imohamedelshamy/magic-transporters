import { ApiProperty } from '@nestjs/swagger';
import { QuestStateEnum } from '../enums';
import { CreateMagicMoverDto } from './create-magic-mover.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateMagicMoverDto extends CreateMagicMoverDto {
  @ApiProperty()
  @IsNotEmpty()
  questState: QuestStateEnum;
}
