import { Component, Input, input, NgModule, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Card } from 'src/app/models/models';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TriComponent } from '../tri/tri.component';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css'],
  standalone: true,
  imports: [CardComponent, FormsModule, CommonModule, TriComponent]
})
export class MagasinComponent implements OnInit {

  listeCartes: Card[] | undefined;
  constructor(public apiService: ApiService) { }

  async ngOnInit() {
    this.listeCartes = await this.apiService.getAllCards();
    console.log(this.listeCartes)
  }

}
