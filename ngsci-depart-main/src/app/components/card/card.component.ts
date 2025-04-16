import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/models';
import { MatCardModule } from '@angular/material/card';
import { transition, trigger, useAnimation } from '@angular/animations';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [MatCardModule, CommonModule],

})
export class CardComponent implements OnInit {

  @Input() card?: Card;
  @Input() show: string = "front";
  @Input() health: number = 0;
  beautifulBackUrl = "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg";
  animatedPowerIndex: number = -1;
  currentAnimationClass: string = '';

  css_wobbleBottom = false;

  constructor() { }

  ngOnInit() {

  }

  getAnimationClass(powerName: string): string {
    switch (powerName.toLowerCase()) {
      case 'First Strike':
        return 'wobble-hor-bottom';
      case 'Thorns':
        return 'rotate-scale-up-ver';
      case 'Heal':
        return '';
      case 'Shield':
        return '';
      default:
        return '';
    }
  }
  async animationsPouvoirs() {
    if (!this.card?.CardPowers) return;

    for (let i = 0; i < this.card.CardPowers.length; i++) {
      const powerName = this.card.CardPowers[i].power.name;
      this.currentAnimationClass = this.getAnimationClass(powerName);
      this.animatedPowerIndex = i;

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setTimeout(() => {
      this.animatedPowerIndex = -1;
      this.currentAnimationClass = '';
    }, 500);
  }

  doubleCenterSpin() {
    this.css_wobbleBottom = false; // force le reset
    setTimeout(() => {
      this.css_wobbleBottom = true;
      setTimeout(() => {
        this.css_wobbleBottom = false;
      }, 2000); // durée de l'animation
    });
  }
}
