import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegramModule } from 'src/providers/telegram.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TelegramModule],
  providers: [BotService, UsersService],
})
export class BotModule {}
