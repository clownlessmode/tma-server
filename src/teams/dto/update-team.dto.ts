import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDto {
  @ApiProperty({ example: 'Andromeda', required: true })
  @IsString()
  name: string;
}
