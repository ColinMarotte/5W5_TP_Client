import { Component, Input, OnInit } from '@angular/core';
import { Card, PlayableCard } from 'src/app/models/models';
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
  public playerMana: number = 0; // Mana du joueur

  @Input() cards: PlayableCard[] = [];

  constructor(public matchService: MatchService) { }

  ngOnInit() {
    this.playerMana = this.matchService.playerData?.mana ?? 0; // Récupérer la mana du joueur
    
  }

  async click(playableCard:PlayableCard){
    let player = this.matchService.playerData;
    if(!player) {
      console.log("Erreur: Impossible de trouver les données du joueur.");
      return;
    }
    if(player.mana < playableCard.card.cost) {
      console.log("Pas assez de mana pour jouer cette carte !");
      return;
    }
    // TODO: Utiliser seulement une fois que l'on peut jouer des cartes (TP2)
    await this.matchService.playCard(playableCard.id);
  }
}
