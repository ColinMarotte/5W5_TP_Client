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

  async register(email: string, password: string, passwordConfirm: string): Promise<string> {
    let registerDTO = new RegisterDTO(
      email,
      password,
      passwordConfirm);

    let x = await lastValueFrom(this.http.post<any>(domain + "api/Account/Register", registerDTO));
    console.log(x);

    if (x.error) {
      console.log(x.error);
      return x.error;
    } else {
      console.log(x.message);
      return await this.login(email, password);
    }
  }

  async login(email: string, password: string): Promise<string> {
    let loginDTO = new LoginDTO(
      email,
      password);

    let stringResponse: string = ""

    await lastValueFrom(this.http.post<any>(domain + "api/Account/Login", loginDTO)).catch((error: HttpErrorResponse) => {
      console.log("error: ", error.error.error);
      stringResponse =  error.error.error
    }).then(response => {
      if (stringResponse == ""){
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

  async test() : Promise<string[]>{
    let x = await lastValueFrom(this.http.get<string[]>(domain + "api/Account/PrivateData"));
    console.log(x);
    return x;
  }
}
