import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5433, 
      username: 'postgres',
      password: 'malatajna',
      database: 'players-db', 
      entities: [Player],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Player]),
    PlayersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
