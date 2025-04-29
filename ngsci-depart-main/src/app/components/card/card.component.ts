import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Card, CardPower } from 'src/app/models/models';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { animate, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';
import { Subscription, timer } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { pulse, shakeX, jello, flip, bounce, rubberBand, swing, tada, wobble, flash, heartBeat } from 'ng-animate';
import { NgStyle } from '@angular/common';
import { PowerComponent } from 'src/app/power/power.component';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [MatCardModule, NgStyle, NgFor, NgIf, PowerComponent],
  animations: [
    trigger('firstStrike', [
      transition(':increment', useAnimation(flip, {
        params: { timing: 2, scale: 1000 }
      }))
    ]),
    trigger('thorns', [
      transition(':increment', useAnimation(tada, {
        params: { timing: 2, scale: 2.5 }
      }))
    ]),
    trigger('heal', [
      transition(':increment', useAnimation(heartBeat, {
        params: { timing: 2, scale: 3 }
      }))
    ]),
    trigger('shield', [
      transition(':increment', useAnimation(flip, {
        params: { timing: 2, scale: 1000 }
      }))
    ])
  ]
})
export class CardComponent implements OnInit, OnChanges, OnDestroy{

  @Input() card!: Card;
  @Input() show: string = "front";
  @Input() health: number = 0;
  @Input() power! : PowerComponent
  @Input() id!:number;
  beautifulBackUrl = "https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg";
  animatedPowerIndex: number = -1;
  animationClass: string = '';
  animationCounters: number[] = [];
  cardId? : number | null= 0;
  PowerAnimateSub: Subscription;
  
  hoveredPowerIndex: number = -1;

  oldHealth: number = 0;
  animate: boolean = false;
  constructor(private service: MatchService) {
    this.PowerAnimateSub = service.cardAnimate$.subscribe(
      id =>{
        // console.log("ID: ", id)
        this.cardId = id;
      }
    ) 
    service.powerAnimate$.subscribe(
      powerIndex => {
        this.animatedPowerIndex= powerIndex;
        
        if(this.id == this.cardId){
          console.log("powerIndex: ", powerIndex)
          console.log("Id: ", this.id);
          this.animatePower()
          // this.animationCounters[powerIndex]++;

        }
      }
    )
    // service.powerAnimate$.subscribe({
    //   next: (powerIndex) => this.animatedPowerIndex = powerIndex
    // });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.PowerAnimateSub.unsubscribe();
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
    this.oldHealth = this.health;
    if (this.card?.cardPowers) {
      this.animationCounters = new Array(this.card.cardPowers.length).fill(0);
    }
    // console.log(this.id, this.animatedPowerIndex)
  }

  count = 0;
  animatedIndex = -1;
  async playAllPowerAnimations() {
    if (!this.card?.cardPowers) return;

    for (let i = 0; i < this.card.cardPowers.length; i++) {
      this.animationCounters[i]++;
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
  test(){
    this.playAllPowerAnimations()
    
  }
  animatePower() {
    

      // this.animate = true;
      console.log("Counter: ", this.animationCounters[this.animatedPowerIndex])
      this.animationCounters[this.animatedPowerIndex]++;
      setTimeout(() => {
        // this.animate = false;
      }, 3000)
      // await new Promise((resolve) => setTimeout(resolve, 1500));

    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
      this.oldHealth = this.health;
    }, 1000)
  }
}
