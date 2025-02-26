import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    let x = await lastValueFrom(this.http.post<any>(domain + "api/Account/Login", loginDTO));
    console.log(x);

    if (x.error) {
      console.log(x.error);
      return x.error;
    } else {
      console.log('Token: ' + x.token);
      console.log('Player Id: ' + x.playerId);
      sessionStorage.setItem("token", x.token);
      sessionStorage.setItem("playerId", x.playerId);
      sessionStorage.setItem("username", email);
      return "success";
    }
  }
}
