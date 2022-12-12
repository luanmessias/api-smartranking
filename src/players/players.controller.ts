import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayersParamsValidationPipe } from './pipes/players-params-validation.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playersService.createPlayer(createPlayerDto);
  }

  @Put('/update/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('_id', PlayersParamsValidationPipe) _id: string,
  ): Promise<void> {
    await this.playersService.updatePlayer(_id, updatePlayerDto);
  }

  @Get()
  async findAllPlayers(): Promise<Player[]> {
    return await this.playersService.findAllPlayers();
  }

  @Get(':_id')
  async findPlayerById(@Param('_id', PlayersParamsValidationPipe) _id: string): Promise<Player> {
    return await this.playersService.findPlayerById(_id);
  }

  @Delete('/delete/:_id')
  async deletePlayer(@Param('_id', PlayersParamsValidationPipe) _id: string): Promise<void> {
    await this.playersService.deletePlayer(_id);
  }
}
