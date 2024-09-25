import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class UpdateUserTeamDto {
  @ApiProperty({ example: 'Andromeda', required: true })
  @IsUUID()
  id: UUID;
}
