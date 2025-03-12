import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlayersComponent, HeaderComponent, RouterModule, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'players-frontend';
}
