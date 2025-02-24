import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

  Champs() {
    if (this.champ = 'attaque') {

    }
    else if (this.champ = 'points') {

    }
    else {

    }
  }


  EnOrdre() {
    if (this.order = 'croissant') {

    }
    else if (this.order = 'decroissant') {

    }
  }

}
