import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Team } from './entities/team.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { role } from 'src/users/entities/enums/role.enum';
import { UpdateUserTeamDto } from './dto/update-user-team.dto';
import { UUID } from 'crypto';
import { UpdateTeamDto } from './dto/update-team.dto';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @ApiOperation({ summary: 'Create new team' })
  @ApiResponse({
    status: 201,
    description: 'New team succesfully created',
    type: Team,
  })
  @ApiBearerAuth()
  @Roles(role.ADMIN)
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @ApiOperation({ summary: 'Find all teams' })
  @ApiBearerAuth()
  @Roles(role.ADMIN)
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @ApiOperation({ summary: 'Update user team' })
  @ApiBearerAuth()
  @Roles(role.ADMIN)
  @Patch('/user/:id')
  async updateUserTeam(
    @Param('id') id: UUID,
    @Body() updateUserTeamDto: UpdateUserTeamDto
  ) {
    return this.teamsService.updateUserTeam(id, updateUserTeamDto);
  }

  @ApiOperation({ summary: 'Update team name by id' })
  @ApiBearerAuth()
  @Roles(role.ADMIN)
  @Patch(':id')
  async updateTeam(
    @Param('id') id: UUID,
    @Body() updateTeamDto: UpdateTeamDto
  ) {
    return this.teamsService.updateTeamName(id, updateTeamDto);
  }
}
