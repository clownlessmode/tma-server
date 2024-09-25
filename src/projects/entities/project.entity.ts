import { DefaultEntity } from 'src/common/entities/default.entity';
import { Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import { Color } from './color.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Project extends DefaultEntity {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  logotype: string;

  @Column()
  @ApiProperty()
  link: string;

  @OneToOne(() => Color, { cascade: true })
  @JoinColumn()
  @ApiProperty()
  colors: Color;
}
