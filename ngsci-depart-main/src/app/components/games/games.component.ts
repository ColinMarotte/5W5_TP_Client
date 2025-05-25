import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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

  currentGames: MatchInfoDTO[] = [];

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.currentMatchesSubscription = this.matchService.currentMatches$.subscribe(currentMatches => {
      console.log('Matchs courants reçus: ', currentMatches);
      this.currentGames = currentMatches;
    });

    this.matchService.getCurrentMatches();
  }

  ngOnDestroy() {
    this.currentMatchesSubscription.unsubscribe();
  }

}
