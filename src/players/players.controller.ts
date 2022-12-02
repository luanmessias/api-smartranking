import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createUpdatePlayer(createPlayerDto);
  }

  @Get()
  async findAllPlayers(): Promise<Player[]> {
    return await this.playersService.findAllPlayers();
  }

  @Get(':email')
  async findPlayerByEmail(@Param('email') email: string): Promise<Player> {
    return await this.playersService.findPlayerByEmail(email);
  }

  @Delete('/delete/:email')
  async deletePlayer(@Param('email') email: string): Promise<void> {
    await this.playersService.deletePlayer(email);
  }
}
