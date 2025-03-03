import { HttpClient } from '@angular/common/http';
import { Component, Input, input, NgModule, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from 'src/app/models/models';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TriComponent } from '../tri/tri.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mescartes',
  templateUrl: './mescartes.component.html',
  styleUrls: ['./mescartes.component.css'],
  standalone: true,
  imports: [CardComponent, FormsModule, CommonModule, TriComponent]
})
export class MescartesComponent implements OnInit {

  apiUrl = "https://localhost:7179/api/";


  listemescartes: Card[] | undefined;
  constructor(private apiservice: ApiService) { }


  playerId = sessionStorage.getItem("playerId")
  async ngOnInit() {

    this.apiservice.getPlayersCards(this.playerId!)
    console.log(this.listemescartes)
  }


}
