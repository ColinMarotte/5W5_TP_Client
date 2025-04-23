import { Card } from './../../models/models';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CardComponent } from '../card/card.component';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-packs',
  standalone: true,
  imports: [NgIf, NgFor, CardComponent],
  templateUrl: './packs.component.html',
  styleUrl: './packs.component.css'
})
export class PacksComponent {

  montantInsuffisant: boolean = false;
  dialogueNouvellesCartes: boolean = false;

  newCards: Card[] | undefined = undefined;
  constructor(private httpService: HttpService, private appComponent: AppComponent) {

  }

  async acheterPaquet(indexPaquet: number) {

    let result = await this.httpService.acheterPaquet(indexPaquet)
    if (result == null) {
      this.montantInsuffisant = true;
    }
    else {
      this.newCards = result;
      this.dialogueNouvellesCartes = true;
      this.appComponent.getSolde();
    }
  }

}
