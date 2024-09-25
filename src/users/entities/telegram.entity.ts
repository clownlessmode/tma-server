import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/common/entities/default.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Telegram extends DefaultEntity {
  @Column({ unique: true })
  @ApiProperty({ example: 691976234 })
  telegramId: number;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Ivan' })
  firstName: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Ivanov' })
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'ivan_ivanov' })
  username: string;
}
