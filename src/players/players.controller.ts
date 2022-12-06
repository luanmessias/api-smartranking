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
import { CreateUpdatePlayerDto } from './dtos/createUpdatePlayer.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { PlayersParamsValidationPipe } from './pipes/players-params-validation.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createUpdatePlayerDto: CreateUpdatePlayerDto) {
    await this.playersService.createPlayer(createUpdatePlayerDto);
  }

  @Put('/update/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() createUpdatePlayerDto: CreateUpdatePlayerDto,
    @Param('_id', PlayersParamsValidationPipe) _id: string,
  ): Promise<void> {
    await this.playersService.updatePlayer(_id, createUpdatePlayerDto);
  }

  @Get()
  async findAllPlayers(): Promise<Player[]> {
    return await this.playersService.findAllPlayers();
  }

  @Get(':email')
  async findPlayerByEmail(
    @Param('email', PlayersParamsValidationPipe) email: string,
  ): Promise<Player> {
    return await this.playersService.findPlayerByEmail(email);
  }

  @Delete('/delete/:_id')
  async deletePlayer(@Param('_id', PlayersParamsValidationPipe) _id: string): Promise<void> {
    await this.playersService.deletePlayer(_id);
  }
}
