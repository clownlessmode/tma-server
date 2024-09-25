import { Injectable, Logger } from '@nestjs/common';
import { Ctx, Help, Start, Update } from 'nestjs-telegraf';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';
@Update()
@Injectable()
export class BotService {
  constructor(private readonly usersService: UsersService) {}

  logger = new Logger('Bot');
  @Start()
  private async start(@Ctx() ctx: Context) {
    const telegramUser = ctx.from;
    this.logger.log(
      `Пользователь ${telegramUser.first_name} (${telegramUser.username}), ID: [${telegramUser.id}] запустил бота командой /start.`
    );
    const createUserDto: CreateUserDto = {
      telegramId: telegramUser.id,
      username: telegramUser.username,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
    };
    try {
      const user = await this.usersService.create(createUserDto);
      this.logger.log(
        `Создан новый пользователь ${telegramUser.username}, его id ${user.id}`
      );
    } catch {}
    await ctx.reply('hi');
  }
  @Help()
  private async help(@Ctx() ctx: Context) {
    const telegramUser = ctx.from;

    this.logger.log(
      `Пользователь ${telegramUser.first_name} (${telegramUser.username}), ID: [${telegramUser.id}] запросил контакты поддержки бота командой /help.`
    );
    await ctx.reply(
      'Для обращения в поддержку напишите в наш саппорт: t.me/purpletooth'
    );
  }
}
