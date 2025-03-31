import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/models';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [MatCardModule, NgStyle]
})
export class CardComponent implements OnInit {

  @Input() card?: Card;
  @Input() show: string = "front";
  @Input() health: number = 0;
  beautifulBackUrl = "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg";

  constructor() {
  }

  getRarityName(rarityValue: number | undefined): string {
    switch (rarityValue) {
      case 0: {
        return "Commun";
      }
      case 1: {
        return "Rare";
      }
      case 2: {
        return "Épique";
      }
      case 3: {
        return "Légendaire";
      }
      default: {
        return "";
      }
    }
  }

  getRarityColor(rarityValue: number | undefined): string {
    switch (rarityValue) {
      case 0:
        return "rgb(169, 169, 169)";
      case 1:
        return "rgb(76, 175, 80)";
      case 2:
        return "rgb(156, 39, 176)";
      case 3:
        return "rgb(255, 87, 34)";
      default:
        return "rgb(169, 169, 169)";
    }
  }


  ngOnInit() {

  }

}
