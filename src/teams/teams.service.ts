import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { EntityManager } from 'typeorm';
import { Team } from './entities/team.entity';
import { UpdateUserTeamDto } from './dto/update-user-team.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly manager: EntityManager) {}
  logger = new Logger('teams');

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const teamExist = await this.manager.findOne(Team, {
      where: {
        name: createTeamDto.name,
      },
    });
    if (teamExist) {
      this.logger.log(teamExist);
      this.logger.warn(`Team ${createTeamDto.name} is already exist`);
      throw new ConflictException('This team name is already taken');
    }
    const team: Team = this.manager.create(Team, { name: createTeamDto.name });
    return await this.manager.save(team);
  }

  async findAll() {
    return await this.manager.find(Team, {});
  }

  async updateUserTeam(
    userId: string,
    updateUserTeamDto: UpdateUserTeamDto
  ): Promise<User> {
    const user = await this.manager.findOne(User, {
      where: { id: userId },
      relations: ['meta'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const team = await this.manager.findOne(Team, {
      where: { id: updateUserTeamDto.id },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    user.meta.team = team;
    return await this.manager.save(user);
  }

  async updateTeamName(
    teamId: string,
    updateTeamDto: UpdateTeamDto
  ): Promise<Team> {
    // Находим существующую команду по ID
    const team = await this.manager.findOne(Team, {
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    team.name = updateTeamDto.name;
    return await this.manager.save(team); // Сохраняем изменения в БД
  }
}
