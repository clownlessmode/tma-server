import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'discord.com/invite/bayc', required: true })
  @IsUrl()
  link: string;
}
