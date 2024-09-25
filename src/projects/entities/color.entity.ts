import { DefaultEntity } from 'src/common/entities/default.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Color extends DefaultEntity {
  @Column()
  light: string;

  @Column()
  dark: string;
}
