import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatchService } from '../services/match.service';
import { ApiService } from '../services/api.service';
import { FakerService } from '../services/faker.service';
import { HubService } from '../services/hub.service';
import { MatchData } from '../models/models';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { EnemyhandComponent } from './enemyhand/enemyhand.component';
import { PlayerhandComponent } from './playerhand/playerhand.component';
import { HealthComponent } from './health/health.component';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  standalone: true,
  imports: [BattlefieldComponent, EnemyhandComponent, PlayerhandComponent, MatButtonModule, HealthComponent]
})
export class MatchComponent implements OnInit {

  matchId: number = 0;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public matchService: MatchService,
    public apiService: ApiService,
    public faker: FakerService,
    public hubService: HubService
  ) {}

  async ngOnInit() {
    this.matchId = parseInt(this.route.snapshot.params["id"], 10);
    let playerId: string | null = sessionStorage.getItem("playerId");

    if (playerId && this.hubService.joiningMatchData) {
      this.matchService.playMatch(this.hubService.joiningMatchData, this.hubService.joiningMatchData.playerA.id);
    }

    if (this.hubService.startMatchEvent) {
      await this.matchService.applyEvent(this.hubService.startMatchEvent);
    }

        /*
    let cards = await this.apiService.getPlayersCards();
    this.matchService.playTestMatch(cards);

    let fakeStartMatchEvent = this.faker.createFakeStartMatchEvent();
    this.matchService.applyEvent(fakeStartMatchEvent);
    */
  }

  async endTurn() {

    await this.hubService.endTurn(this.hubService.userId, this.matchId);
    await this.matchService.applyEvent(this.hubService.endTurnEvent);
    // this.fakeEndTurn();
  }

  async fakeEndTurn() {
    let fakeEndTurnEvent = this.faker.createFakePlayerEndTurnEvent(this.matchService.playerData!, this.matchService.adversaryData!);
    await this.matchService.applyEvent(fakeEndTurnEvent);

    await new Promise(resolve => setTimeout(resolve, 3000));

    let adversaryFakeEndTurnEvent = this.faker.createFakePlayerEndTurnEvent(this.matchService.adversaryData!, this.matchService.playerData!);
    await this.matchService.applyEvent(adversaryFakeEndTurnEvent);
  }

  async surrender() {
    let playerId: string | null = sessionStorage.getItem("playerId");
    if (!playerId || !this.hubService.joiningMatchData) return;

    let matchId: number = parseInt(this.route.snapshot.params["id"], 10);
    let userId: number | null = null;

    if (parseInt(playerId, 10) === this.hubService.joiningMatchData.playerA.id) {
      userId = this.hubService.joiningMatchData.playerA.id;
    }

    if (userId) {
      await this.hubService.surrender(userId.toString(), matchId);
      await this.matchService.applyEvent(this.hubService.surrenderEvent);
    }

    // this.fakeSurrender();
  }

  fakeSurrender() {
    let fakeEndMatchEvent = this.faker.createFakeEndMatchEvent(this.matchService.adversaryData!);
    this.matchService.applyEvent(fakeEndMatchEvent);
  }

  endMatch() {
    this.matchService.clearMatch();
    this.router.navigate(['/']);
  }

  isVictory(): boolean {
    return this.matchService.matchData?.winningPlayerId === this.matchService.playerData?.playerId ?? false;
  }

  isMatchCompleted(): boolean {
    return this.matchService.matchData?.match.isMatchCompleted ?? false;
  }
}
