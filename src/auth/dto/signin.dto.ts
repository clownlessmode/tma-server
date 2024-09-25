import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class SignInDto {
  @ApiProperty({
    example: 'e1b2f3d4-5678-9abc-def0-1234567890ab',
    required: true,
  })
  @IsUUID()
  id: UUID;
}
