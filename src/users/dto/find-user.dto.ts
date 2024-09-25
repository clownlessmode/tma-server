import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindUserDto {
  @ApiProperty({
    example: '374d7a76-5faa-49ca-b79c-dc09f189c4dd',
    required: true,
  })
  @IsUUID()
  id: string;
}
