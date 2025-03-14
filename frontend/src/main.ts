import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { PlayersComponent } from './app/players/players.component';
import { NationalTeamsComponent } from './app/national-teams/national-teams.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter([
          {path: 'players', component: PlayersComponent},
          {path: 'nationalteams', component: NationalTeamsComponent},
          { path: '', redirectTo: 'players', pathMatch: 'full' }
        ]),
        provideHttpClient()
    ]
})
  .catch((err) => console.error(err));
