import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public match: MatchService) { }

  recherche!: Boolean;
  ngOnInit() {

  }


  joinMatch() {
    // TODO: Anuglar: Afficher un dialogue qui montre que l'on attend de joindre un match
    // TODO: Hub: Se connecter au Hub et joindre un match

    let matchId = -1;
    this.recherche = true;

    setTimeout(() => {
      this.router.navigate(['/match/' + matchId]);

    },
      1000)


    console.log()
  }
}


