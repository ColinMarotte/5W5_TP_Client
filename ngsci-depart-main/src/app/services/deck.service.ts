import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Deck, OwnedCard } from '../models/models';
import { NewDeckDTO } from '../models/dtos';

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

  async currentDeck(deck: Deck): Promise<Deck[]> {
    let deckId: number = deck.id;

    let x = await lastValueFrom(this.http.get<any>(domain + "api/Decks/MakeDeckCurrent/" + deckId));
    console.log(x);

    return await this.getDecks();
  }

  async getCardsNotInDeck(deck: Deck): Promise<OwnedCard[]> {
    let deckId: number = deck.id;

    let x = await lastValueFrom(this.http.get<OwnedCard[]>(domain + "api/Decks/GetCardsNotInDeck/" + deckId));
    console.log(x);

    return x;
  }

  async addCardsToDeck(deck: Deck, cards: OwnedCard[]): Promise<Deck[]> {
    let deckId: number = deck.id;

    let ownedCardsIds: number[] = [];
    cards.forEach(card => {
      ownedCardsIds.push(card.id);
    });

    let x = await lastValueFrom(this.http.post<any>(domain + "api/Decks/AddCardsToDeck/" + deckId, ownedCardsIds));
    console.log(x);

    return await this.getDecks();
  }
}
