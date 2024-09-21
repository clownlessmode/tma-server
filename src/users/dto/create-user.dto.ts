import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'Cool Project',
    required: true,
  })
  @IsString()
  name: string;
}
