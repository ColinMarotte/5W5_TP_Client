import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { MatButtonModule } from '@angular/material/button';
import { HubService } from 'src/app/services/hub.service';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
  imports: [MatButtonModule, RouterOutlet, FormsModule]
})
export class HomeComponent implements OnInit {

    estJoueur1: boolean = true;

  constructor(public router: Router, public match: MatchService, public hubService : HubService) { }

  ngOnInit() {

  }

  async joinMatch() {
    // TODO: Anuglar: Afficher un dialogue qui montre que l'on attend de joindre un match
    // TODO: Hub: Se connecter au Hub et joindre un match

    // TODO : Placeholder avant Identity ------
    let userId:string = this.estJoueur1 ? "User1Id" : "User2Id";
    if(this.estJoueur1)
      sessionStorage.setItem("playerId", "1");
    else
      sessionStorage.setItem("playerId", "2");

    this.hubService.userId = userId;
    // ------------------------------------------

    await this.hubService.joinMatch(userId);
    let joiningMatchDate = this.hubService.joiningMatchData
    console.log(joiningMatchDate)
    if(joiningMatchDate == null)
    {
      return;
    }
    else{
      let matchId = joiningMatchDate.match.id;
      this.router.navigate(['/match/' + matchId]);
    }
  }
}


