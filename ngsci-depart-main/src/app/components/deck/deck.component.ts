import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Card, Deck, DeckOwnedCard, OwnedCard } from 'src/app/models/models';
import { DeckService } from 'src/app/services/deck.service';
import { CardComponent } from "../card/card.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AddcardstodeckdialogComponent } from '../addcardstodeckdialog/addcardstodeckdialog.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  standalone: true,
  imports: [CommonModule, MatButton, MatChipsModule, CardComponent, MatTooltipModule, MatIconModule, MatDialogModule]
})
export class DeckComponent implements OnInit {

  @Input() deck?: Deck;

  @Input() nbCardsMax?: number;

  cardsOutput: OwnedCard[] = [];

  cardToDelete?: DeckOwnedCard;

  @Output() refreshParent = new EventEmitter<void>();

  constructor(public deckService: DeckService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  async deleteCard(card: DeckOwnedCard) {
    this.cardToDelete = card;
    await this.deckService.removeCardFromDeck(this.deck!!, this.cardToDelete);

    if (this.deck && this.deck.deckOwnedCards) {
      this.deck.deckOwnedCards = this.deck?.deckOwnedCards.filter(doc => doc.id !== this.cardToDelete?.id);
    }
  }

  async deleteDeck() {
    await this.deckService.deleteDeck(this.deck!!);
    this.reloadMesDecks();
  }

  async currentDeck() {
    await this.deckService.currentDeck(this.deck!!);
    this.reloadMesDecks();
  }

  async getCardsNotInDeck(): Promise<OwnedCard[]> {
    return await this.deckService.getCardsNotInDeck(this.deck!!);
  }

  async openDialog(): Promise<void> {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      ownedCards: await this.getCardsNotInDeck(),
      name: this.deck?.name,
      nbCardsInDeck: this.deck?.deckOwnedCards.length,
      nbCardsMax: this.nbCardsMax
    }

    const dialogRef = this.dialog.open(AddcardstodeckdialogComponent, dialogConfig);

    const data = await firstValueFrom(dialogRef.afterClosed());
    console.log("AddCardsToDeck Dialog output:", data)
       
    if (data != undefined) {
      this.cardsOutput = data;
      let newCards: DeckOwnedCard[] = await this.deckService.addCardsToDeck(this.deck!!, this.cardsOutput);
      newCards.forEach(card => {
        this.deck?.deckOwnedCards.push(card);
      });
    }
  }

  isDeckFull(): boolean {
    if(this.nbCardsMax == undefined){
      return true;
    }

    if(this.deck?.deckOwnedCards.length!! >= this.nbCardsMax) {
      return true;
    } else {
      return false;
    }
  }

  reloadMesDecks() {
    this.refreshParent.emit();
  }
}
