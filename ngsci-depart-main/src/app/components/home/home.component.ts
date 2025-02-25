import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, CommonModule, FormsModule, MatIcon]
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public match: MatchService, private fb: FormBuilder) { }

  recherche: Boolean = false;

  ngOnInit() {

  }


  joinMatch() {
    // TODO: Anuglar: Afficher un dialogue qui montre que l'on attend de joindre un match
    // TODO: Hub: Se connecter au Hub et joindre un match

    let matchId = -1;
    this.recherche = true;

    /* const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true, // Empêche l'utilisateur de fermer la boîte de dialogue
    }); */
    setTimeout(() => {
      // dialogRef.close();
      this.router.navigate(['/match/' + matchId]);

    },
      1000)


    console.log()
  }
}


