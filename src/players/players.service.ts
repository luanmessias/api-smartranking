import { UpdatePlayerDto } from './dtos/update-player.dto';
import { CreatePlayerDto } from './dtos/create-player.dto';
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

  async findPlayerById(_id: string): Promise<any> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with id ${_id} not found`);
    }

    return playerFound;
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      throw new BadRequestException(`Player with email ${createPlayerDto.email} already exists`);
    }

    const createPlayer = new this.playerModel(createPlayerDto);
    return await createPlayer.save();
  }

  async updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new Error(`Player not found`);
    }

    return await this.playerModel.findOneAndUpdate({ _id }, { $set: updatePlayerDto }).exec();
  }

  async deletePlayer(_id: string): Promise<any> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with id ${_id} not found`);
    }

    return await this.playerModel.deleteOne({ _id }).exec();
  }
}
