import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './Player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor(private http: HttpClient){}
  
  addNewPlayer(newPlayer: Player): Observable<Player> {
    return this.http.post<Player>('http://localhost:3000/players', newPlayer);
  }

  getPlayers(){
    return this.http.get<Player[]>('http://localhost:3000/players');
  }
}
