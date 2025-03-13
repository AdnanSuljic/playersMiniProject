import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player)
        private playersRepository: Repository<Player>
    ){}

    async findAll(): Promise<Player[]> {
        return this.playersRepository.find();
    }
      
    async create(player: Player): Promise<Player> {
        return this.playersRepository.save(player);
    }
      
}
