import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatProgressSpinner, MatButtonModule, RouterOutlet, CommonModule, FormsModule, MatButtonModule]
})

export class HomeComponent implements OnInit, OnDestroy {

  estJoueur1: boolean = true;
  private joiningMatchSubscription: Subscription | null = null;

  constructor(public router: Router, public matchService: MatchService) {

  }

  recherche: boolean = false;

  ngOnInit() {
    this.joiningMatchSubscription = this.matchService.joiningMatch$.subscribe(async (event) => {
      if (event && !event.match.isMatchCompleted && this.matchService.inGame) {
        console.log("Received JoiningMatchEvent:", event);
        const matchId = event.match.id;
        this.redirigerAuMatch(matchId);
      }
    });
  }

  ngOnDestroy() {
    if (this.joiningMatchSubscription) {
      this.joiningMatchSubscription.unsubscribe();
    }
  }

  async redirigerAuMatch(matchId: number) {
    await this.router.navigateByUrl('/match/' + matchId);
  }

  async joinMatch() {
    await this.router.navigateByUrl('/home')
    let userId = sessionStorage.getItem("userId");

    if (userId) {
      await this.matchService.joinMatch();
    }
    this.recherche = true;
    console.log("Waiting for the match to start...");
  }

  async stopJoiningMatch() {
    let userId = sessionStorage.getItem("userId");
    let stoppedJoiningMatch = false
    if (userId) {
      stoppedJoiningMatch = await this.matchService.stopJoiningMatch();
    }

    if (stoppedJoiningMatch) {
      this.recherche = false
      console.log('Réussi à arrêter de rejoindre le match')
      await this.matchService.seDeconnecterDuHub();
    }

  }
}
