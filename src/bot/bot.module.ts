import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegramModule } from 'src/providers/telegram.module';

@Module({
  imports: [TelegramModule],
  providers: [BotService],
})
export class BotModule {}
