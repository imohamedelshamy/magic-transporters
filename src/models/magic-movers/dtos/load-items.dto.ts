import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class LoadItemsDto {
  @ApiProperty({ example: [4, 2, 3] })
  @IsArray()
  itemsIds: number[];
}
