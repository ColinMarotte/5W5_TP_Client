import { AppComponent } from 'src/app/app.component';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
import { ChatComponent } from "../components/chat/chat.component";


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  standalone: true,
  imports: [BattlefieldComponent, EnemyhandComponent, PlayerhandComponent, MatButtonModule, HealthComponent, CommonModule, ChatComponent]
})
export class MatchComponent implements OnInit, OnDestroy {

  matchId: number = 0;
  montantRecu = 0;


  private MoneyreceivedSubscription: Subscription | null = null;
  private spectatorSubscription: Subscription | null = null;

  spectating: boolean | null = null;

  constructor(private route: ActivatedRoute, public router: Router, public matchService: MatchService, public apiService: ApiService, private appComponent: AppComponent) {

  }

  async ngOnInit() {
    this.matchId = parseInt(this.route.snapshot.params["id"], 10);
    this.isPlayerSpectator();
    let playerIdString: string | null = sessionStorage.getItem("playerId");
    let playerId: number | null = null;
    if (playerIdString) {
      playerId = parseInt(playerIdString);
    }

    this.spectatorSubscription = this.matchService.spectating$.subscribe(value => {
      if (value !== undefined && value !== null) {
        this.spectating = value;
        if (!this.matchService.match) {
          if (this.spectating) {
            this.matchService.spectateMatch(this.matchId);
          } else {
            this.matchService.joinMatch();
          }
        }
      }
    });

    this.MoneyreceivedSubscription = this.matchService.MoneyReveiced$.subscribe(async (montantRecu) => {
      this.montantRecu = montantRecu!
    });
  }

  async ngOnDestroy() {
    this.MoneyreceivedSubscription?.unsubscribe();
    this.spectatorSubscription?.unsubscribe();
    await this.matchService.seDeconnecterDuHub();
  }

  async endTurn() {
    await this.matchService.endTurn();
  }

  async surrender() {
    await this.matchService.surrender()
  }

  async endMatch() {
    this.matchService.clearMatch();
    this.appComponent.getSolde();
    //this.appComponent.getELO();
    await this.router.navigate(['/']);
  }

  isVictory(): boolean {
    return this.matchService.matchData?.winningPlayerId === this.matchService.playerData?.playerId ?? false;
  }

  isMatchCompleted(): boolean {
    return this.matchService.matchData?.match.isMatchCompleted ?? false;
  }

  async isPlayerSpectator() {
    await this.matchService.isPlayerSpectator(this.matchId);
  }

  async quitGame() {
    this.matchService.clearMatch();
    await this.router.navigate(['/games']);
  }

}
