import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Card, CardPower } from 'src/app/models/models';
import { MatCardModule } from '@angular/material/card';
import { transition, trigger, useAnimation } from '@angular/animations';
import { timer } from 'rxjs';
import { lastValueFrom } from 'rxjs';

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

  css_classanimation = false;

  constructor() { }

  ngOnInit() { }

  getAnimationClass(powerName: string): string {
    switch (powerName.toLowerCase()) {
      case 'First Strike':
        return 'wobble-hor-bottom';
      case 'Thorns':
        return 'rotate-scale-up-ver';
      case 'Heal':
        return 'bounce-in-fwd';
      case 'Shield':
        return 'rotate-in-center';
      default:
        return 'rotate-in-center';
    }
  }

  animation(i: number) {
    if (!this.card?.cardPowers || !this.card.cardPowers[i]?.power?.name)
      return;

    const powerName = this.card.cardPowers[i].power.name;  // Récupérer le nom du pouvoir
    this.animationClass = 'rotate-in-center';  // Déterminer la classe d'animation
    console.log(this.getAnimationClass(powerName))

    this.css_classanimation = true

    setTimeout(() => {
      this.css_classanimation = false;
    }, 500);

    let x = 5;
  }

  // Utilisation de async/await pour gérer l'attente des animations
  // async animationsPouvoirs() {
  //   if (!this.card?.cardPowers) return;

  //   for (let i = 0; i < this.card.cardPowers.length; i++) {
  //     const powerName = this.card.cardPowers[i].power.name;
  //     this.animationClass = this.getAnimationClass(powerName);
  //     this.animatedPowerIndex = i;

  //     // Attente de 500 ms avant de passer à l'animation suivante
  //     await this.waitFor(0.5);
  //   }

  //   // Réinitialisation après toutes les animations
  //   await this.waitFor(0.5);  // Attente supplémentaire si nécessaire
  //   this.animatedPowerIndex = -1;
  //   this.animationClass = '';
  // }

  // // Fonction pour gérer les délais (en secondes)
  // async waitFor(delayInSeconds: number) {
  //   await lastValueFrom(timer(delayInSeconds * 1000));
  // }


  // async doubleCenterSpin(index?: number) {
  //   if (index !== undefined) {

  //     this.animatedPowerIndex = index;
  //     const powerName = this.card?.cardPowers?.[index].power.name || '';
  //     this.animationClass = this.getAnimationClass(powerName);
  //     console.log(powerName + this.animatedPowerIndex)

  //     // Attente de 2 secondes pour cette animation
  //     await this.waitFor(2);  // Attente de 2 secondes avant de réinitialiser l'index
  //     this.animatedPowerIndex = -1;
  //     this.animationClass = '';
  //   } else {
  //     // Animation Wobble avec délai
  //     this.css_wobbleBottom = true;
  //     await this.waitFor(2);  // Attente de 2 secondes avant de réinitialiser
  //     this.css_wobbleBottom = false;
  //   }
  // }
}
