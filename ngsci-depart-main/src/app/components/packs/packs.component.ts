import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-packs',
  standalone: true,
  imports: [],
  templateUrl: './packs.component.html',
  styleUrl: './packs.component.css'
})
export class PacksComponent {

  constructor(private httpService: HttpService) {

  }

  acheterPaquet(indexPaquet: number) {
    this.httpService.acheterPaquet(indexPaquet)
  }

}
