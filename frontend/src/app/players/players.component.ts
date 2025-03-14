import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Player } from '../Player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, CanvasJSAngularChartsModule],
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
  searchText: string = '';
  chart: any;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    this.http.get<Player[]>('http://localhost:3000/players').subscribe(
      (response) => {
        this.players = response
        this.isLoading = false;

        this.players.forEach(player => {
          this.chartOptions.data[0].dataPoints.push({
            label: player.playerName,
            y: player.numberOfGoals
          });
        });
        this.chartOptions.data[0].dataPoints.sort((a, b) => a.y - b.y);
        this.renderChart();
      },
      (error) => {
        this.isLoading = false;
        console.log('Error:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.renderChart();
    this.cdr.detectChanges()
  }

  get filteredPlayers(): Player[] {
    if (!this.searchText) {
      return this.players; 
    }
    const lowerCaseSearch = this.searchText.toLowerCase();
    return this.players.filter(
      (player) =>
        player.playerName.toLowerCase().includes(lowerCaseSearch) ||
        player.nationalTeam.toLowerCase().includes(lowerCaseSearch)
    );
  }

  chartOptions: { 
    title: { text: string },
    animationEnabled: boolean,
    axisY: { includeZero: boolean, suffix: string },
    data: { 
      type: string, 
      indexLabel: string, 
      yValueFormatString: string, 
      dataPoints: { label: string, y: number }[] 
    }[]
  } = {
    title: { text: "Goals per player" },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: " Goals"
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      yValueFormatString: "#,###",
      dataPoints: [] 
    }]
  };

  onSubmit() {
    this.http.post('http://localhost:3000/players', this.newPlayer)
      .subscribe(
        (response) => {
          console.log('Data sent successfully!', response);
          this.chartOptions.data[0].dataPoints.push({
            label: this.newPlayer.playerName,
            y: this.newPlayer.numberOfGoals
          });
          this.chartOptions.data[0].dataPoints.sort((a, b) => a.y - b.y);
          this.http.get<Player[]>('http://localhost:3000/players').subscribe(
            (players) => {
              this.players = players; 
            },
            (error) => {
              console.error('Error fetching updated players list:', error);
            }
          );
        },
        (error) => {
          console.error('Error!', error);
          alert('Error while sending data.');
        }
      );
  }

  renderChart() {
    setTimeout(() => {
      this.chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
      this.chart.render();
    }, 0);
  }

}
