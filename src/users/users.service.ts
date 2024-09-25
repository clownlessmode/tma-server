import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager } from 'typeorm';
import { Telegram } from './entities/telegram.entity';
import { Meta } from './entities/meta.entity';
import { User } from './entities/user.entity';
import { Team } from '../teams/entities/team.entity';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly manager: EntityManager) {}
  logger = new Logger('Users');

  async create(createUserDto: CreateUserDto): Promise<User> {
    const telegramExist = await this.manager.findOne(Telegram, {
      where: { telegramId: createUserDto.telegramId },
    });
    const nullableTeam = await this.manager.findOneOrFail(Team, {
      where: { name: null },
    });

    if (telegramExist) {
      throw new ConflictException(
        `Ошибка при создании пользователя: ${createUserDto.telegramId} - этот Телеграм ID уже существует`
      );
    }
    const telegram: Telegram = this.manager.create(Telegram, {
      telegramId: createUserDto.telegramId,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
    });
    const savedTelegram: Telegram = await this.manager.save(telegram);
    const meta: Meta = this.manager.create(Meta, { team: nullableTeam });
    const savedMeta: Meta = await this.manager.save(meta);
    const user: User = this.manager.create(User, {
      telegram: savedTelegram,
      meta: savedMeta,
    });

    const savedUser: User = await this.manager.save(user);

    return savedUser;
  }

  async findOne(findUserDto: FindUserDto): Promise<User> {
    const user = await this.manager.findOne(User, {
      where: { id: findUserDto.id },
      relations: { meta: { team: true }, telegram: true },
    });
    if (!user) {
      this.logger.warn(`Пользователь не найден`);
      throw new ConflictException(`Пользователь не найден`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.manager.find(User, {
      relations: { meta: { team: true }, telegram: true },
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    return await this.manager.findOne(User, { where: { refreshToken } });
  }

  async updateTeam(id, updateTeamDto): Promise<string> {
    return `To user (${id}) succesfully set new team: ${updateTeamDto.name}`;
  }
}
