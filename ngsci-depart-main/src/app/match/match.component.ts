import { AppComponent } from 'src/app/app.component';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, OutletContext, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatchService } from '../services/match.service';
import { ApiService } from '../services/api.service';
import { MatchData } from '../models/models';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { EnemyhandComponent } from './enemyhand/enemyhand.component';
import { PlayerhandComponent } from './playerhand/playerhand.component';
import { HealthComponent } from './health/health.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  standalone: true,
  imports: [
    BattlefieldComponent,
    EnemyhandComponent,
    PlayerhandComponent,
    MatButtonModule,
    HealthComponent,
    CommonModule,
  ],
})
export class MatchComponent implements OnInit {
  matchId: number = 0;
  montantRecu = 0;
  private MoneyreceivedSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public matchService: MatchService,
    public apiService: ApiService,
    private appComponent: AppComponent
  ) {}

  async ngOnInit() {
    this.matchId = parseInt(this.route.snapshot.params['id'], 10);
    let playerIdString: string | null = sessionStorage.getItem('playerId');
    let playerId: number | null = null;
    if (playerIdString) {
      playerId = parseInt(playerIdString);
    }
    if (!this.matchService.match) {
      this.matchService.joinMatch();
    }
    this.MoneyreceivedSubscription = this.matchService.MoneyReveiced$.subscribe(
      async (montantRecu) => {
        this.montantRecu = montantRecu!;
      }
    );
  }
  async endTurn() {
    await this.matchService.endTurn();
  }

  async surrender() {
    await this.matchService.surrender();
  }

  async endMatch() {
    this.matchService.clearMatch();
    this.appComponent.getSolde();
    await this.router.navigate(['/']);
  }

  isVictory(): boolean {
    return (
      this.matchService.matchData?.winningPlayerId === this.matchService.playerData?.playerId ?? false
    );
  }

  isMatchCompleted(): boolean {
    return this.matchService.matchData?.match.isMatchCompleted ?? false;
  }
}
