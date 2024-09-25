import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '691976234',
    required: true,
  })
  @IsNumber()
  telegramId: number;

  @ApiProperty({
    example: 'Ivan',
    required: false,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Ivanov',
    required: false,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'ivan_ivanov',
    required: false,
  })
  @IsString()
  username: string;
}
