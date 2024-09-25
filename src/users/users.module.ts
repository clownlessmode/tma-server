import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Meta } from './entities/meta.entity';
import { Telegram } from './entities/telegram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Telegram, Meta])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
