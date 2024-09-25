import { Module } from '@nestjs/common';
import { EnvFilePathModule } from './providers/env-file-path.module';
import { PostgresModule } from './providers/postgres.module';
import { BotModule } from './bot/bot.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { DiscordService } from './discord/discord.service';
import { DiscordModule } from './discord/discord.module';
import { AccountsModule } from './accounts/accounts.module';
@Module({
  imports: [
    EnvFilePathModule,
    PostgresModule,
    BotModule,
    UsersModule,
    TeamsModule,
    AuthModule,
    ProjectsModule,
    DiscordModule,
    AccountsModule,
  ],
  controllers: [],
  providers: [DiscordService],
})
export class AppModule {}
