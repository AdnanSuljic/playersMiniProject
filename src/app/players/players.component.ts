import { Component, OnInit } from '@angular/core';
import { Player } from '../Player';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../services/players.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit{

  players: Player[] = []
  newPlayer: Player = {
    id: -1,
    playerName: '',
    numberOfGoals: 0,
    numberOfAppearances: 0,
    nationalTeam: '',
  };
  isLoading: boolean = true
  data: any

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    this.http.get('http://localhost:3000/players').subscribe(
      (response) => {
        this.data = response;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log('Error:', error);
      }
    );
  }

  onSubmit() {
    this.http.post('http://localhost:3000/players', this.players)
      .subscribe(
        (response) => {
          console.log('Data sent successfuly!', response);
          alert('Data added in database!');
        },
        (error) => {
          console.error('Error!', error);
          alert('Error while sending data.');
        }
      );
  }
}
