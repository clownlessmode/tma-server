import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ example: 'Andromeda', required: true })
  @IsString()
  @IsOptional()
  name?: string | null;
}
