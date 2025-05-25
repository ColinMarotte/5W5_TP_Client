import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatchInfoDTO } from 'src/app/models/dtos';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class GamesComponent implements OnInit, OnDestroy {

  private currentMatchesSubscription!: Subscription;

  private joiningMatchSubscription: Subscription | null = null;

  currentGames: MatchInfoDTO[] = [];

  constructor(private matchService: MatchService, public router: Router) { }

  ngOnInit() {
    this.currentMatchesSubscription = this.matchService.currentMatches$.subscribe(currentMatches => {
      console.log('Matchs courants reçus: ', currentMatches);
      this.currentGames = currentMatches;
    });

    this.joiningMatchSubscription = this.matchService.joiningMatch$.subscribe(async (event) => {
      if (event && !event.match.isMatchCompleted) {
        console.log("Received JoiningMatchEvent:", event);
        const matchId = event.match.id;
        this.redirigerAuMatch(matchId);
      }
    });

    this.matchService.getCurrentMatches();
  }

  ngOnDestroy() {
    this.currentMatchesSubscription.unsubscribe();
    if (this.joiningMatchSubscription) {
      this.joiningMatchSubscription.unsubscribe();
    }
  }

  async redirigerAuMatch(matchId: number) {
    await this.router.navigateByUrl('/match/' + matchId);
  }

  async joinMatch(matchId: number) {
    await this.matchService.spectateMatch(matchId);
  }

}
