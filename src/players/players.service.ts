import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);
  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.create(createPlayerDto);
  }
  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, phoneNumber, email } = createPlayerDto;
    const player: Player = {
      _id: uuid(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      rankingPosition: 1,
      urlPhotoPlayer: 'http://teste.com',
    };
    this.logger.log(`Player: ${JSON.stringify(player)}`);
    this.players.push(player);
  }
}
