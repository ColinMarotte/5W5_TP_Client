import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatProgressSpinner, MatButtonModule, RouterOutlet, CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public match: MatchService) { }

  recherche: boolean = false;

  ngOnInit() {

  }


  joinMatch() {
    // TODO: Anuglar: Afficher un dialogue qui montre que l'on attend de joindre un match
    // TODO: Hub: Se connecter au Hub et joindre un match

    let matchId = -1;

    setTimeout(() => {

      this.router.navigate(['/match/' + matchId]);
      console.log('match trouvé !');
    },
      5000)


    this.recherche = true;
    console.log('recherche de joueur en cours...');
  }
}


