import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../Player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private apiUrl = 'http://localhost:3000/players';

  constructor(private http: HttpClient) {}

  
}
