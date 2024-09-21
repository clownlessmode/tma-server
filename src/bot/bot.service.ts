import { Injectable, Logger } from '@nestjs/common';
import { Ctx, Help, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
@Update()
@Injectable()
export class BotService {
  // LOGGER INSTANCE
  logger = new Logger('Bot');
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Start()
  private async start(@Ctx() ctx: Context) {
    // VARIABLES
    const telegramUser = ctx.from;

    // LOGGING
    this.logger.log(
      `Пользователь ${telegramUser.first_name} (${telegramUser.username}), ID: [${telegramUser.id}] запустил бота командой /start.`
    );
    // MESSAGE
    await ctx.reply('hi');
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Help()
  private async help(@Ctx() ctx: Context) {
    // VARIABLES
    const telegramUser = ctx.from;

    // LOGGING
    this.logger.log(
      `Пользователь ${telegramUser.first_name} (${telegramUser.username}), ID: [${telegramUser.id}] запросил контакты поддержки бота командой /help.`
    );
    // MESSAGE
    await ctx.reply(
      'Для обращения в поддержку напишите в наш саппорт: t.me/purpletooth'
    );
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}
