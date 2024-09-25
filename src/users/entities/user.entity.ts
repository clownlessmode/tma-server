import { ApiProperty } from '@nestjs/swagger';
import { DefaultEntity } from 'src/common/entities/default.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Meta } from './meta.entity';
import { Telegram } from './telegram.entity';
@Entity()
export class User extends DefaultEntity {
  @OneToOne(() => Meta, { cascade: true })
  @JoinColumn()
  @ApiProperty()
  meta: Meta;

  @OneToOne(() => Telegram, { cascade: true })
  @JoinColumn()
  @ApiProperty()
  telegram: Telegram;

  @Column({ nullable: true })
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3NGQ3YTc2LTVmYWEtNDljYS1iNzlAS^DTAS^&*DT&*SADY&*ASHDU78IjoxNzI2OTAzNDA0fQ.AgUaYt9g8PM86HpXG1zBV5bm6NV-i2A4325dfvzS84',
  })
  refreshToken: string | null;
}
