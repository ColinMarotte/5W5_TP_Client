import { Component, OnChanges, OnInit } from '@angular/core';
import { MatchService } from './services/match.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from './services/http.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs/internal/Subscription';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
    RouterOutlet,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink
  ],
})
export class AppComponent implements OnInit {
  title = 'supercartesinfinies';
  solde: number = 0;

  private MatchReveivedMoneySubscription: Subscription | null = null;
  private ConnectionReceivedMoeny: Subscription | null = null;

  constructor(public router: Router, public matchService: MatchService, public httpService: HttpService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSolde();
    this.ConnectionReceivedMoeny = this.httpService.MoneyReveiced$.subscribe(async (montantInital) => {
      if (montantInital) {
        this.solde = montantInital!;
        sessionStorage.setItem("Solde", this.solde.toString());
      }
    });

    this.MatchReveivedMoneySubscription = this.matchService.MoneyReveiced$.subscribe(async (montantGagne) => {
      console.log("Argent gagné pour l'utilisateur: ", montantGagne);
      if (montantGagne) {
        this.solde += montantGagne;
        sessionStorage.setItem("Solde", this.solde.toString());
      }
    });
    this.solde = parseInt(sessionStorage.getItem("Solde")!)
  }

  isLogged(): boolean {
    return this.httpService.isLogged();
  }

  getUsername() {
    let username: string | null = sessionStorage.getItem("username");
    return username;
  }

  async getSolde() {
    this.solde = await this.httpService.getSolde();
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("playerId");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("Solde")
    console.log('Déconnexion réussie!');
    this.login();
    this.snackBar.open('Déconnexion réussie!', 'OK', { duration: 5000 });
  }

  login() {
    this.router.navigate(['/login']);
  }

  async test() {
    let testData: string = (await this.httpService.test()).toString();
    this.snackBar.open(testData, 'OK', { duration: 5000 });
  }
}
