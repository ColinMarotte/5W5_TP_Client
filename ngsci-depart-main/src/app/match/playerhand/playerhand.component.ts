import { Component, Input, OnInit } from '@angular/core';
import { PlayableCard } from 'src/app/models/models';
import { CardComponent } from '../../components/card/card.component';
import { MatchService } from 'src/app/services/match.service';


@Component({
    selector: 'app-playerhand',
    templateUrl: './playerhand.component.html',
    styleUrls: ['./playerhand.component.css'],
    standalone: true,
    imports: [CardComponent]
})
export class PlayerhandComponent implements OnInit {

  @Input() cards: PlayableCard[] = [];

  constructor(public matchService: MatchService) { }

  ngOnInit() {

  }

  async click(playableCardId:any){
    // TODO: Utiliser seulement une fois que l'on peut jouer des cartes (TP2)
    await this.matchService.playCard(playableCardId);
  }
}
