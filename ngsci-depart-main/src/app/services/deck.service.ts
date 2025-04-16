import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const domain = "https://localhost:7179/"

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(public http: HttpClient) { }

}
