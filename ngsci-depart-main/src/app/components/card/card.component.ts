import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Card } from 'src/app/models/models';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [MatCardModule]
})
export class CardComponent implements OnInit, OnChanges {

  @Input() card?: Card;
  @Input() show: string = "front";
  @Input() health: number = 0;
  beautifulBackUrl = "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg";

  oldHealth:number = 0;
  animate: boolean = false;

  constructor() { }

  ngOnInit() {
    this.oldHealth = this.health;

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
      this.oldHealth = this.health;
    },1000)
  }
}
