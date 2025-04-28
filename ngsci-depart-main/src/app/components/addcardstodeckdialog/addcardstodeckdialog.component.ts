import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Card, OwnedCard } from 'src/app/models/models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-addcardstodeckdialog',
  templateUrl: './addcardstodeckdialog.component.html',
  styleUrls: ['./addcardstodeckdialog.component.css'],
  standalone: true,
  imports: [MatButton, MatDialogModule, CommonModule, CardComponent]
})
export class AddcardstodeckdialogComponent implements OnInit {

  deckName: string | null = null;

  cards: OwnedCard[] = [];

  selectedCards: OwnedCard[] = [];

  nbCardsMax: number = 0;

  nbCardsInDeck: number = 0;

  constructor(public deckService: DeckService, private dialogRef: MatDialogRef<AddcardstodeckdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ownedCards: OwnedCard[]; name: string; nbCardsInDeck: number; nbCardsMax: number }) { }

  ngOnInit() {
    this.cards = this.data.ownedCards;
    console.log('Cartes reçues: ' + this.data.ownedCards);

    this.deckName = this.data.name;
    console.log('Nom du deck: ' + this.data.name);

    this.nbCardsInDeck = this.data.nbCardsInDeck;
    console.log('Nombre de cartes déjà dans le deck: ' + this.data.nbCardsInDeck);

    this.nbCardsMax = this.data.nbCardsMax;
    console.log('Nombre de cartes maximum: ' + this.data.nbCardsMax);
  }

  save() {
    console.log('Cartes sélectionnées :', this.selectedCards);
    this.dialogRef.close(this.selectedCards);
  }

  close() {
    this.dialogRef.close();
  }

  toggleSelection(carte: any) {
    const index = this.selectedCards.findIndex(c => c.id === carte.id);
    if (index > -1) {
      this.selectedCards.splice(index, 1);
    } else {
      this.selectedCards.push(carte);
    }
  }

  isSelected(carte: any): boolean {
    return this.selectedCards.some(c => c.id === carte.id);
  }

  isNbCardsMaxReached(): boolean {
    if(this.nbCardsInDeck >= this.nbCardsMax || this.nbCardsInDeck + this.selectedCards.length > this.nbCardsMax) {
      return true;
    } else {
      return false;
    }
  }

}
