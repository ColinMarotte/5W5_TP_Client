import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Card, CardPower } from 'src/app/models/models';
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
  animationClass: string = '';

  css_wobbleBottom = false;

  constructor() { }

  ngOnInit() {
    // Si la carte existe, injecte-lui des CardPowers fake
    if (this.card) {
      const fakePowers: CardPower[] = [
        {
          id: 1,
          cardId: this.card.id,
          powerId: 1,
          value: 5,
          power: {
            id: 1,
            name: 'First Strike',
            description: 'Attaque en premier.',
            icone: 'fas fa-shield-alt',
            CardPowers: [],
          },
          card: this.card
        },
        {
          id: 2,
          cardId: this.card.id,
          powerId: 2,
          value: 3,
          power: {
            id: 2,
            name: 'Thorns',
            description: 'Renvoie des dégâts.',
            icone: '🌵',
            CardPowers: [],
          },
          card: this.card
        }
      ];

      this.card.CardPowers = fakePowers;
    }
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
      this.animationClass = this.getAnimationClass(powerName);
      this.animatedPowerIndex = i;

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setTimeout(() => {
      this.animatedPowerIndex = -1;
      this.animationClass = '';
    }, 500);
  }

  doubleCenterSpin(index?: number) {
    if (index !== undefined) {
      this.animatedPowerIndex = index;
      const powerName = this.card?.CardPowers?.[index].power.name || '';
      this.animationClass = this.getAnimationClass(powerName);
      console.log('Animation started for index:', index);
      console.log(this.animationClass)

      setTimeout(() => {
        this.animatedPowerIndex = -1;
        this.animationClass = '';
      }, 2000);
    } else {
      this.css_wobbleBottom = true;
      setTimeout(() => {
        this.css_wobbleBottom = false;
      }, 2000);
    }
  }
}
