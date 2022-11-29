import { Controller, Post, Body } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/createPlayer.dto';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const { name, email } = createPlayerDto;
    return JSON.stringify(`{
      "name": "${name}",
      "email": "${email}",
    }`);
  }
}
