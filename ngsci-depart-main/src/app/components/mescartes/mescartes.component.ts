
import { HttpClient } from '@angular/common/http';
import { Component, Input, input, NgModule, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from 'src/app/models/models';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mescartes',
  templateUrl: './mescartes.component.html',
  styleUrls: ['./mescartes.component.css'],
  standalone: true,
  imports: [CardComponent, FormsModule, CommonModule]
})
export class MescartesComponent implements OnInit {

  apiUrl = "https://localhost:7179/api/";

  listecartes: Card[] | undefined;
  constructor(private http: HttpClient) { }


  async ngOnInit() {
    this.listecartes = await lastValueFrom(this.http.get<any>(this.apiUrl + "Card/GetAllCards"))
    console.log(this.listecartes)
  }

  // async GetMyCards(): Promise<void> {


  //   //this.listecartes?.push(x)
  //   //console.log(this.listecartes)
  // }
}
