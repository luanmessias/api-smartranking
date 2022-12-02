import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;
    const playerFound = this.players.find((player) => player.email === email);

    if (playerFound) {
      this.updatePlayer(playerFound, createPlayerDto);
    } else {
      this.createPlayer(createPlayerDto);
    }
  }

  async findAllPlayers(): Promise<Player[]> {
    return this.players;
  }

  async findPlayerByEmail(email: string): Promise<Player> {
    const playerFound = this.players.find((player) => player.email === email);

    if (!playerFound) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    return playerFound;
  }

  private async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
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

  private updatePlayer(
    playerFound: Player,
    createPlayerDto: CreatePlayerDto,
  ): void {
    const { name } = createPlayerDto;
    playerFound.name = name;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerFound = this.players.find((player) => player.email === email);

    if (!playerFound) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    this.players = this.players.filter((player) => player.email !== email);
  }
}
