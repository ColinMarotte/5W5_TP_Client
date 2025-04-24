import { Component } from '@angular/core';
import { MatchService } from './services/match.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from './services/http.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
export class AppComponent {
  title = 'supercartesinfinies';

  constructor(public router: Router, public matchService: MatchService, public httpService: HttpService, public snackBar: MatSnackBar) { }

  isLogged(): boolean {
    return this.httpService.isLogged();
  }

  getUsername() {
    let username: string | null = sessionStorage.getItem("username");
    return username;
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("playerId");
    sessionStorage.removeItem("username");
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
