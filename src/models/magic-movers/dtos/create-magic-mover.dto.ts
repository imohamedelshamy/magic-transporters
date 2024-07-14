import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMagicMoverDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  weightLimit: number;

  @ApiProperty()
  @IsNumber()
  energyCapacity: number;

  @ApiProperty()
  @IsNumber()
  currentEnergy: number;
}
