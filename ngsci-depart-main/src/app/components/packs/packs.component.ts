import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-packs',
  standalone: true,
  imports: [NgIf],
  templateUrl: './packs.component.html',
  styleUrl: './packs.component.css'
})
export class PacksComponent {

  showMessage: boolean = false

  constructor(private httpService: HttpService) {

  }

  async acheterPaquet(indexPaquet: number) {

    let result = await this.httpService.acheterPaquet(indexPaquet)
    if (result == null) {
      this.showMessage = true;
    }
  }

}
