import { Module } from '@nestjs/common';
import { EnvFilePathModule } from './providers/env-file-path.module';
import { PostgresModule } from './providers/postgres.module';
import { BotModule } from './bot/bot.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [EnvFilePathModule, PostgresModule, BotModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
