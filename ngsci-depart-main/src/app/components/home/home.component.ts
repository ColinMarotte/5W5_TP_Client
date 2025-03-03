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
  private startMatchSubscription: Subscription | null = null;

  constructor(
    public router: Router,
    public match: MatchService
  ) {}

  ngOnInit() {
    // Subscribe to start match event
    this.startMatchSubscription = this.match.startMatch$.subscribe(async (event) => {
      if (event) {
        console.log("Received StartMatchEvent:", event);
        const matchId = event.match.matchId;
        this.router.navigate(['/match/' + matchId]);
      }
    });
  }

  ngOnDestroy() {
    if (this.startMatchSubscription) {
      this.startMatchSubscription.unsubscribe();
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
