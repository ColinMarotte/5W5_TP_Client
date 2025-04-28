import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Deck, DeckOwnedCard, OwnedCard } from '../models/models';
import { DeckConfigDTO, NewDeckDTO } from '../models/dtos';

const domain = "https://localhost:7179/"

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(public http: HttpClient) { }

  async getDecks(): Promise<Deck[]> {
    let x = await lastValueFrom(this.http.get<Deck[]>(domain + "api/Decks/GetPlayersDecks"));
    console.log(x);
    return x;
  }

  async createDeck(deckName: string): Promise<Deck[]> {
    let newDeckDTO = new NewDeckDTO(
      deckName
    );

    let x = await lastValueFrom(this.http.post<any>(domain + "api/Decks/CreateDeck", newDeckDTO));
    console.log(x);

    return await this.getDecks();
  }

  async currentDeck(deck: Deck): Promise<void> {
    let deckId: number = deck.id;

    let x = await lastValueFrom(this.http.get<any>(domain + "api/Decks/MakeDeckCurrent/" + deckId));
    console.log(x);
  }

  async getCardsNotInDeck(deck: Deck): Promise<OwnedCard[]> {
    let deckId: number = deck.id;

    let x = await lastValueFrom(this.http.get<OwnedCard[]>(domain + "api/Decks/GetCardsNotInDeck/" + deckId));
    console.log(x);

    return x;
  }

  async addCardsToDeck(deck: Deck, cards: OwnedCard[]): Promise<DeckOwnedCard[]> {
    let deckId: number = deck.id;

    let ownedCardsIds: number[] = [];
    cards.forEach(card => {
      ownedCardsIds.push(card.id);
    });

    let x = await lastValueFrom(this.http.post<DeckOwnedCard[]>(domain + "api/Decks/AddCardsToDeck/" + deckId, ownedCardsIds));
    console.log(x);

    return x;
  }

  async deleteDeck(deck: Deck): Promise<void> {
    let deckId: number = deck.id;

    let x = await lastValueFrom(this.http.get<any>(domain + "api/Decks/DeleteDeck/" + deckId));
    console.log(x);
  }

  async removeCardFromDeck(deck: Deck, card: DeckOwnedCard): Promise<void> {
    let deckId: number = deck.id;
    let deckOwnedCardId: number = card.id

    let x = await lastValueFrom(this.http.post<any>(domain + "api/Decks/RemoveCardFromDeck/" + deckId, deckOwnedCardId));
    console.log(x);
  }

  async getDeckConfig(): Promise<DeckConfigDTO> {
    let x = await lastValueFrom(this.http.get<DeckConfigDTO>(domain + "api/Decks/GetDeckConfig"));
    console.log(x);

    return x;
  }
}
