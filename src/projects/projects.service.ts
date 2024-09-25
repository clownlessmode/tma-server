import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { EntityManager } from 'typeorm';
import { Project } from './entities/project.entity';
import { Color } from './entities/color.entity';
import { DiscordService } from 'src/discord/discord.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly manager: EntityManager,
    private discordService: DiscordService
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const projectExist = await this.manager.findOne(Project, {
      where: {
        link: createProjectDto.link,
      },
    });
    if (projectExist) {
      throw new ConflictException('This project is already exist');
    }

    const discordData = await this.discordService.getDiscordData(
      createProjectDto.link
    );

    const colors: Color = this.manager.create(Color, {
      light: discordData.colors.light,
      dark: discordData.colors.dark,
    });
    const savedColors = await this.manager.save(colors);

    const project: Project = this.manager.create(Project, {
      logotype: discordData.icon,
      name: discordData.name,
      colors: savedColors,
      link: createProjectDto.link,
    });
    return await this.manager.save(project);
  }
  findAll() {
    return this.manager.find(Project, { relations: { colors: true } });
  }
}
