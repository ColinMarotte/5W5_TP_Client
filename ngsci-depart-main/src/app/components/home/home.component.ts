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
  imports: [MatProgressSpinner, MatButtonModule, RouterOutlet,CommonModule, FormsModule]
})

export class HomeComponent implements OnInit, OnDestroy {

  estJoueur1: boolean = true;
  private joiningMatchSubscription: Subscription | null = null;

  constructor(
    public router: Router,
    public match: MatchService
  ) { }

  recherche: boolean = false;

  ngOnInit() {
    this.joiningMatchSubscription = this.match.joiningMatch$.subscribe(async (event) => {
      if (event) {
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
    let userId = this.estJoueur1 ? "User1Id" : "User2Id";
    if (this.estJoueur1)
      sessionStorage.setItem("playerId", "1");
    else
      sessionStorage.setItem("playerId", "2");

    this.match.currentPlayerId = this.estJoueur1 ? 1 : 2;

    await this.match.joinMatch(userId);
    this.recherche = true;
    console.log("Waiting for the match to start...");
  }
}
