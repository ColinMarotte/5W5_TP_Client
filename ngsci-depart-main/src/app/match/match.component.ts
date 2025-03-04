import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatchService } from '../services/match.service';
import { ApiService } from '../services/api.service';
// import { FakerService } from '../services/faker.service';
import { MatchData } from '../models/models';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { EnemyhandComponent } from './enemyhand/enemyhand.component';
import { PlayerhandComponent } from './playerhand/playerhand.component';
import { HealthComponent } from './health/health.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  standalone: true,
  imports: [BattlefieldComponent, EnemyhandComponent, PlayerhandComponent, MatButtonModule, HealthComponent]
})
export class MatchComponent implements OnInit, OnDestroy {

  userId: string = "";
  matchId: number = 0;

  private startMatchSubscription : Subscription | null = null;
  private endTurnSubscription : Subscription | null = null;
  private surrenderSubscription : Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public matchService: MatchService,
    public apiService: ApiService,
    //public faker: FakerService
  ) {}

  async ngOnInit() {
    this.matchId = parseInt(this.route.snapshot.params["id"], 10);
    let playerIdString: string | null = sessionStorage.getItem("playerId");
    let playerId : number | null=null;
    if(playerIdString){
    playerId= parseInt(playerIdString); }
        
    this.startMatchSubscription = this.matchService.startMatch$.subscribe(async (event) => {
      if (event) {
        console.log("Received StartMatchEvent:", event);
        const matchId = event.match.id;
        this.router.navigate(['/match/' + matchId]);
      }
    });
    this.endTurnSubscription = this.matchService.endTurn$.subscribe(async (event) => {
      if (event) {
        console.log("Received EndTurnEvent:", event);
        const matchId = event.match.id;
        this.router.navigate(['/match/' + matchId]);
      }
    });
    this.surrenderSubscription = this.matchService.surrender$.subscribe(async (event) => {
      if (event) {
        console.log("Received SurrenderEvent:", event);
        const matchId = event.match.id;
        this.router.navigate(['/match/' + matchId]);
      }
    });
        /*
    let cards = await this.apiService.getPlayersCards();
    this.matchService.playTestMatch(cards);

    let fakeStartMatchEvent = this.faker.createFakeStartMatchEvent();
    this.matchService.applyEvent(fakeStartMatchEvent);
    */
  }

  ngOnDestroy() {
    if (this.startMatchSubscription) {
      this.startMatchSubscription.unsubscribe();
    }
    if (this.endTurnSubscription) {
      this.endTurnSubscription.unsubscribe();
    }
    if (this.surrenderSubscription) {
      this.surrenderSubscription.unsubscribe();
    }
  }

  public async joinMatch(userId: string){
    this.matchService.joinMatch(userId)
      
    this.userId=userId  
    }
  
  async endTurn() {
    this.matchService.endTurn();
    // this.fakeEndTurn();
  }

  // async fakeEndTurn() {
  //   let fakeEndTurnEvent = this.faker.createFakePlayerEndTurnEvent(this.matchService.playerData!, this.matchService.adversaryData!);
  //   await this.matchService.applyEvent(fakeEndTurnEvent);

  //   await new Promise(resolve => setTimeout(resolve, 3000));

  //   let adversaryFakeEndTurnEvent = this.faker.createFakePlayerEndTurnEvent(this.matchService.adversaryData!, this.matchService.playerData!);
  //   await this.matchService.applyEvent(adversaryFakeEndTurnEvent);
  // }

  async surrender() {

    this.matchService.surrender()

    // this.fakeSurrender();
  }

  // fakeSurrender() {
  //   let fakeEndMatchEvent = this.faker.createFakeEndMatchEvent(this.matchService.adversaryData!);
  //   this.matchService.applyEvent(fakeEndMatchEvent);
  // }

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
