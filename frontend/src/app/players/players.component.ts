import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Player } from '../Player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, FormsModule, CanvasJSAngularChartsModule],
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

  constructor(private playersService: PlayersService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    this.getPlayersFromDb()
  }

  ngAfterViewInit(): void {
    this.renderChart();
    this.cdr.detectChanges()
  }

  onSubmit() {
    this.playersService.addNewPlayer(this.newPlayer).subscribe(() => {
      this.resetFormAfterAddingPlayer();
      this.updatePlayersAfterAdding();
      this.timeOutForChartReload();
    });
  }

  get filteredPlayers(): Player[] {
    if (!this.searchText) 
      return this.players; 
    
    return this.filterPlayers()
  }

  updateChartData() {
    this.clearChartData()
    this.addPlayersToChart()
    this.sortChartAsc()
    this.cdr.detectChanges(); 
  }
  
  renderChart() {
    setTimeout(() => {
      if (this.chart) 
        this.chart.destroy(); 

      this.chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
      this.chart.render();
    }, 0);
  }

  sortChartAsc(){
    this.chartOptions.data[0].dataPoints.sort((a, b) => a.y - b.y);
  }

  resetFormAfterAddingPlayer(){
    this.newPlayer = {
      id: -1,
      playerName: '',
      numberOfGoals: 0,
      numberOfAppearances: 0,
      nationalTeam: '',
    };
  }

  addPlayersToChart(){
    this.players.forEach(player => {
      this.chartOptions.data[0].dataPoints.push({
        label: player.playerName,
        y: player.numberOfGoals
      });
    });
  }

  clearChartData(){
    this.chartOptions.data[0].dataPoints = [];
  }

  getPlayersFromDb(){
    this.playersService.getPlayers().subscribe(
      (response) => {
        this.players = response;
        this.updateChartData();
        this.renderChart();
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  updatePlayersAfterAdding(){
    this.playersService.getPlayers().subscribe(
      (players) => {
        this.players = players; 
      },
      (error) => {
        console.error('Error fetching updated players list:', error);
      }
    );
  }

  timeOutForChartReload(){ //time out necessary to wait for players to refresh
    setTimeout(() => {
      this.updateChartData();
      this.renderChart();
    }, 100);
    this.cdr.detectChanges()
  }

  filterPlayers(){
    const lowerCaseSearch = this.searchText.toLowerCase();
    return this.players.filter(
      (player) =>
        player.playerName.toLowerCase().includes(lowerCaseSearch) 
    );
  }

}
