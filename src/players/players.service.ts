import { CreateUpdatePlayerDto } from './dtos/createUpdatePlayer.dto';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

  private readonly logger = new Logger(PlayersService.name);

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

  async createPlayer(createUpdatePlayerDto: CreateUpdatePlayerDto): Promise<Player> {
    const { email } = createUpdatePlayerDto;
    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      throw new BadRequestException(
        `Player with email ${createUpdatePlayerDto.email} already exists`,
      );
    }

    const createPlayer = new this.playerModel(createUpdatePlayerDto);
    return await createPlayer.save();
  }

  async updatePlayer(_id: string, createUpdatePlayerDto: CreateUpdatePlayerDto): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new Error(`Player not found`);
    }

    return await this.playerModel.findOneAndUpdate({ _id }, { $set: createUpdatePlayerDto }).exec();
  }

  async deletePlayer(_id: string): Promise<any> {
    return await this.playerModel.deleteOne({ _id }).exec();
  }
}
