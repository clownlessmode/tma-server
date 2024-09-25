import { DefaultEntity } from 'src/common/entities/default.entity';
import { role } from './enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from '../../teams/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
@Entity()
export class Meta extends DefaultEntity {
  @ManyToOne(() => Team, { cascade: true })
  @JoinColumn()
  @ApiProperty({
    example: {
      id: 'e1b2f3d4-5678-9abc-def0-1234567890ab',
      name: 'Andromeda',
      created_at: '2024-09-21T12:34:56.789Z',
      updated_at: '2024-09-21T12:34:56.789Z',
    },
  })
  team: Team;

  @ApiProperty({
    example: 'https://i.ibb.co/TmyH5Vw/placeholder-light.png',
  })
  @Column({ nullable: true, default: null })
  avatar: string;

  @ApiProperty({ example: 'MEMBER' })
  @Column({ type: 'enum', enum: role, default: role.MEMBER })
  role: role;
}
