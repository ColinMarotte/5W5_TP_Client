import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card, CardPower } from '../models/models';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = "https://localhost:7179/";

  constructor(public http: HttpClient) { }

  async getAllCards(): Promise<Card[]> {
    let result = await lastValueFrom(this.http.get<Card[]>(this.serverUrl + 'api/Card/GetAllCards'));
    return result;
  }

  async getPlayersCards(): Promise<Card[]> {
    let result = await lastValueFrom(this.http.get<Card[]>(this.serverUrl + 'api/Card/GetPlayersCards'));
    console.log("result1")
    if (result[0].cardPowers) {
      let x: CardPower[] = result[0].cardPowers;
      console.log(x)
    }

    console.log("result2")
    return result;
  }

  async getPlayerStats(playerId: string): Promise<any> {
    let result = await lastValueFrom(this.http.get<any>(this.serverUrl + "api/Statistiques/GetPlayerStatistiques/" + playerId));

    return result
  }

  async getdeckStats(deckid: string): Promise<any> {
    let result = await lastValueFrom(this.http.get<any>(this.serverUrl + "api/Statistiques/GetDeckStatistiques/" + deckid));
    return result
  }

  async getDecksStatistiques(userId: string): Promise<any> {
    let x = await lastValueFrom(this.http.get<any>(this.serverUrl + "api/Decks/GetPlayersDecksStatistiques/" + userId));
    console.log(x);
    return x;
  }
}
