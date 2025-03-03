import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginDTO, RegisterDTO } from '../models/dtos';
import { lastValueFrom } from 'rxjs';

const domain = "https://localhost:7179/"

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  async isLogged(): Promise<boolean> {
    const token = sessionStorage.getItem("token")
    if (token != "") {
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
        console.log('Token: ' + response.token);
        console.log('Player Id: ' + response.playerId);
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("playerId", response.playerId);
        sessionStorage.setItem("username", email);
        stringResponse = "success";
      }
    })
    return stringResponse;
  }

  async test(): Promise<string[]> {
    let x = await lastValueFrom(this.http.get<string[]>(domain + "api/Account/PrivateData"));
    console.log(x);
    return x;
  }
}
