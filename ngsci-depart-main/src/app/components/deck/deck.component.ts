import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Card, Deck, OwnedCard } from 'src/app/models/models';
import { DeckService } from 'src/app/services/deck.service';
import { CardComponent } from "../card/card.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AddcardstodeckdialogComponent } from '../addcardstodeckdialog/addcardstodeckdialog.component';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  standalone: true,
  imports: [CommonModule, MatButton, MatChipsModule, CardComponent, MatTooltipModule, MatIconModule, MatDialogModule]
})
export class DeckComponent implements OnInit {

  @Input() deck?: Deck;

  cardsOutput: OwnedCard[] = [];

  constructor(public deckService: DeckService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  async deleteDeck() {

  }

  async currentDeck() {
    await this.deckService.currentDeck(this.deck!!);
    location.reload();
  }

  async getCardsNotInDeck(): Promise<OwnedCard[]> {
    return await this.deckService.getCardsNotInDeck(this.deck!!);
  }

  async openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      ownedCards: await this.getCardsNotInDeck(),
      name: this.deck?.name
    }

    const dialogRef = this.dialog.open(AddcardstodeckdialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("AddCardsToDeck Dialog output:", data)
      if (data != undefined) {
        this.cardsOutput = data;
        this.deckService.addCardsToDeck(this.deck!!, this.cardsOutput);
        location.reload();
      }
    });
  }

}
