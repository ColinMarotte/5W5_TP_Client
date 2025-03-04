import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, FormsModule]
})
export class HomeComponent implements OnInit, OnDestroy {

  estJoueur1: boolean = true;
  private joiningMatchSubscription: Subscription | null = null;

  constructor(
    public router: Router,
    public match: MatchService
  ) {}

  ngOnInit() {
    this.joiningMatchSubscription = this.match.joiningMatch$.subscribe(async (event) => {
      if (event) {
        console.log("Received JoiningMatchEvent:", event);
        const matchId = event.match.matchId;
        this.router.navigate(['/match/' + matchId]);
      }
    });
  }

  ngOnDestroy() {
    if (this.joiningMatchSubscription) {
      this.joiningMatchSubscription.unsubscribe();
    }
  }

  async joinMatch() {
    let userId = this.estJoueur1 ? "User1Id" : "User2Id";
    if (this.estJoueur1)
      sessionStorage.setItem("playerId", "1");
    else
      sessionStorage.setItem("playerId", "2");

    this.match.currentPlayerId = this.estJoueur1 ? 1 : 2;

    await this.match.joinMatch(userId);

    console.log("Waiting for the match to start...");
  }
}
