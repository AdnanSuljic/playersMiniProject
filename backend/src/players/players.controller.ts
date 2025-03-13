import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from 'src/player.entity';

@Controller('players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService){}

    @Get()
    async findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

    @Post()
    async create(@Body() players: Player): Promise<Player> {
    return this.playersService.create(players);
  }
}
