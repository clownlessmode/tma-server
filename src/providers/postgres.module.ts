import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Color } from 'src/projects/entities/color.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Meta } from 'src/users/entities/meta.entity';
import { Telegram } from 'src/users/entities/telegram.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: configService.getOrThrow<'postgres'>('DATABASE_TYPE'),
          host: configService.getOrThrow<string>('DATABASE_HOST'),
          port: configService.getOrThrow<number>('DATABASE_PORT'),
          username: configService.getOrThrow<string>('DATABASE_USERNAME'),
          password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
          database: configService.getOrThrow<string>('DATABASE_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
          useUTC: true,
          poolSize: 20,
          entities: [User, Telegram, Meta, Team, Project, Color],
        };
      },
    }),
  ],
})
export class PostgresModule {}
