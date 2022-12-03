import { CreatePlayerDto } from './dtos/createPlayer.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      this.updatePlayer(createPlayerDto);
    } else {
      this.createPlayer(createPlayerDto);
    }
  }

  async findAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async findPlayerByEmail(email: string): Promise<any> {
    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    return playerFound;
  }

  private async createPlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const createPlayer = new this.playerModel(createPlayerDto);
    return await createPlayer.save();
  }

  private async updatePlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDto.email },
        { $set: createPlayerDto },
      )
      .exec();
  }

  async deletePlayer(email: string): Promise<any> {
    return await this.playerModel.deleteOne({ email }).exec();
  }
}
