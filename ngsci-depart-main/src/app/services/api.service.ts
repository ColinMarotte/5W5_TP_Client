import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card, CardPower } from '../models/models';

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
}
