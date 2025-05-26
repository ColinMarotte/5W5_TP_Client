import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginDTO, RegisterDTO } from '../models/dtos';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Card } from '../models/models';

const domain = "https://localhost:7179/"

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private MoneyReceivedSubject = new BehaviorSubject<number | null>(null);
  public MoneyReveiced$ = this.MoneyReceivedSubject.asObservable();


  constructor(public http: HttpClient) { }

  isLogged(): boolean {
    let token = sessionStorage.getItem("token")
    if (token != null) {
      return true
    }
    return false
  }

  async register(email: string, password: string, passwordConfirm: string): Promise<string> {
    let registerDTO = new RegisterDTO(
      email,
      password,
      passwordConfirm);

    let stringResponse: string = "";

    await lastValueFrom(this.http.post<any>(domain + "api/Account/Register", registerDTO)).catch((error: HttpErrorResponse) => {
      console.log("Erreur: ", error.error.error);
      stringResponse = error.error.error;
    }).then(async response => {
      if (stringResponse == "") {
        console.log("Réponse: ", response);
        stringResponse = await this.login(email, password);
      }
    })
    return stringResponse;
  }

  async login(email: string, password: string): Promise<string> {
    let loginDTO = new LoginDTO(
      email,
      password);

    let stringResponse: string = "";

    await lastValueFrom(this.http.post<any>(domain + "api/Account/Login", loginDTO)).catch((error: HttpErrorResponse) => {
      console.log("Erreur: ", error.error.error);
      stringResponse = error.error.error;
    }).then(response => {
      if (stringResponse == "") {
        console.log("Réponse: ", response);
        console.log("Token: " + response.token);
        console.log("User Id: " + response.userId);
        console.log("Player Id: " + response.playerId);
        console.log("Solde: " + response.solde);
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("userId", response.userId);
        sessionStorage.setItem("playerId", response.playerId);
        sessionStorage.setItem("username", email);
        sessionStorage.setItem("Solde", response.solde);
        // sessionStorage.setItem("ELO", response.ELO);
        stringResponse = "success";
        this.MoneyReceivedSubject.next(response.solde);
      }
    })
    return stringResponse;
  }

  async test(): Promise<string[]> {
    let x = await lastValueFrom(this.http.get<string[]>(domain + "api/Account/PrivateData"));
    console.log(x);
    return x;
  }

  async acheterPaquet(paquetIndex: number): Promise<Card[] | null> {
    let x = await lastValueFrom(this.http.get<Card[]>(domain + "api/Packs/AcheterPaquet/" + paquetIndex));
    console.log(x);
    return x;
  }

  async getSolde(): Promise<number> {
    let x = await lastValueFrom(this.http.get<number>(domain + "api/Account/Solde"));
    console.log("solde", x);
    return x;
  }
  async getELO(): Promise<number>{
    let x = await lastValueFrom(this.http.get<number>(domain + "api/Account/ELO"));
    console.log("ELO: ", x);
    return x;
  }

  async getPlayerStats(playerId: string): Promise<any> {
    let result = await lastValueFrom(this.http.get<any>(domain + "api/Statistiques/GetPlayerStatistiques" + playerId));

    return result
  }
}
