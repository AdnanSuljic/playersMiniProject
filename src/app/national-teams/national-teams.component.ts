import { Component } from '@angular/core';
import { NationalTeam } from '../NationalTeam';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-national-teams',
  imports: [CommonModule],
  templateUrl: './national-teams.component.html',
  styleUrl: './national-teams.component.css'
})
export class NationalTeamsComponent {
    nationalTeams: NationalTeam[] = [
      { nameOfTeam: "Brazil", numberOfTrophies: 5 },   
      { nameOfTeam: "Germany", numberOfTrophies: 4 },  
      { nameOfTeam: "Italy", numberOfTrophies: 4 },    
      { nameOfTeam: "Argentina", numberOfTrophies: 3 },
      { nameOfTeam: "France", numberOfTrophies: 2 },   
      { nameOfTeam: "Uruguay", numberOfTrophies: 2 },  
      { nameOfTeam: "England", numberOfTrophies: 1 },  
      { nameOfTeam: "Spain", numberOfTrophies: 1 }     
    ]
}
