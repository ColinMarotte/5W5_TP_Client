import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { Card } from 'src/app/models/models';

@Component({
  selector: 'app-tri',
  templateUrl: './tri.component.html',
  standalone: true,
  imports: [CardComponent, FormsModule],
  styleUrls: ['./tri.component.css']
})
export class TriComponent implements OnInit {

  @Input() listecartes: any[] = [];
  champ!: String;
  order!: String;
  carte!: Card;

  constructor() { }

  ngOnInit() {
  }

  trier(): Card[] {

    if (this.champ === 'attaque') {
      if (this.order === 'croissant') {
        this.listecartes = this.listecartes.sort((a, b) => b.attack - a.attack)
      } else {
        this.listecartes = this.listecartes.sort((a, b) => a.attack - b.attack)
      }
    }
    else if (this.champ === 'points') {
      if (this.order === 'croissant') {
        this.listecartes = this.listecartes.sort((a, b) => b.health - a.health)
      } else {
        this.listecartes = this.listecartes.sort((a, b) => a.health - b.health)
      }
    }
    else if (this.champ === 'cout') {
      if (this.order === 'croissant') {
        this.listecartes = this.listecartes.sort((a, b) => b.cost - a.cost)
      } else {
        this.listecartes = this.listecartes.sort((a, b) => a.cost - b.cost)
      }
    }

    return this.listecartes
  }

}
