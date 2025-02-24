import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { Card } from 'src/app/models/models';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@microsoft/signalr';

@Component({
  selector: 'app-tri',
  templateUrl: './tri.component.html',
  standalone: true,
  imports: [CardComponent, FormsModule, CommonModule],
  styleUrls: ['./tri.component.css']
})
export class TriComponent implements OnInit {

  @Input() listecartes?: Card[] = [];
  @Input() card: any
  champ!: String;
  order!: String;
  carte!: Card;
  apiUrl = "https://localhost:7179/api/";

  constructor() { }


  async ngOnInit() {
    this.trier();
  }




  trier(): Card[] | undefined {

    if (this.champ === 'attaque') {
      if (this.order === 'croissant') {
        this.listecartes = this.listecartes?.sort((a, b) => b.attack - a.attack)
      } else {
        this.listecartes = this.listecartes?.sort((a, b) => a.attack - b.attack)
      }
    }
    else if (this.champ === 'points') {
      if (this.order === 'croissant') {
        this.listecartes = this.listecartes?.sort((a, b) => b.health - a.health)
      } else {
        this.listecartes = this.listecartes?.sort((a, b) => a.health - b.health)
      }
    }
    else if (this.champ === 'cout') {
      if (this.order === 'croissant') {
        this.listecartes = this.listecartes?.sort((a, b) => b.cost - a.cost)
      } else {
        this.listecartes = this.listecartes?.sort((a, b) => a.cost - b.cost)
      }
    }

    console.log(this.listecartes)
    return this.listecartes
  }

}
