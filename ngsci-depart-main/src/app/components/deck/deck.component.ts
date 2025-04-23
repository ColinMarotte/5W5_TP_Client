import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Deck } from 'src/app/models/models';
import { DeckService } from 'src/app/services/deck.service';
import { CardComponent } from "../card/card.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  standalone: true,
  imports: [CommonModule, MatButton, MatChipsModule, CardComponent, MatTooltipModule, MatIconModule]
})
export class DeckComponent implements OnInit {

  @Input() deck?: Deck;

  constructor(public deckService: DeckService) { }

  ngOnInit() {
  }

  async deleteDeck() {

  }

  async currentDeck() {
    await this.deckService.currentDeck(this.deck!!);
  }

}
