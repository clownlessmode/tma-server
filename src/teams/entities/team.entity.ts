import { DefaultEntity } from 'src/common/entities/default.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
@Entity()
export class Team extends DefaultEntity {
  @ApiProperty({
    example: 'Andromeda',
    nullable: true,
    default: null,
    uniqueItems: true,
  })
  @Column({ nullable: true, default: null })
  name: string;
}
