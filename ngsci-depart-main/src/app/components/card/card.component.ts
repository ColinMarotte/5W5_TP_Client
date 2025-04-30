import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Card, CardPower } from 'src/app/models/models';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Subscription, timer } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import {
  pulse,
  shakeX,
  jello,
  flip,
  bounce,
  rubberBand,
  swing,
  tada,
  wobble,
  flash,
  heartBeat,
} from 'ng-animate';
import { NgStyle } from '@angular/common';
import { PowerComponent } from 'src/app/power/power.component';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [MatCardModule, NgStyle, NgFor, NgIf],
  animations: [
    trigger('firstStrike', [
      transition(
        ':increment',
        useAnimation(flip, {
          params: { timing: 2, scale: 1000 },
        })
      ),
    ]),
    trigger('thorns', [
      transition(
        ':increment',
        useAnimation(tada, {
          params: { timing: 2, scale: 3 },
        })
      ),
    ]),
    trigger('heal', [
      transition(
        ':increment',
        useAnimation(heartBeat, {
          params: { timing: 2, scale: 3 },
        })
      ),
    ]),
    trigger('shield', [
      transition(
        ':increment',
        useAnimation(flip, {
          params: { timing: 2, scale: 1000 },
        })
      ),
    ]),
    trigger('trigger', [
      transition(
        ':increment',
        useAnimation(flip, {
          params: { timing: 2 },
        })
      ),
    ]),
  ],
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() card!: Card;
  @Input() show: string = 'front';
  @Input() health: number = 0;
  @Input() id: number = -1;
  @Output() activate = new EventEmitter<boolean>;
  beautifulBackUrl =
    'https://i.pinimg.com/236x/3c/73/0d/3c730d6df70700a3c912a3c87d6d2027.jpg';
  animatedPowerIndex: number = -1;
  animationClass: string = '';
  animationCounters: number[] = [];
  cardId?: number = -1;
  // PowerAnimateSub: Subscription;

  hoveredPowerIndex: number = -1;

  oldHealth: number = 0;
  animate: boolean = false;
  animatedIndex = -1;

  constructor(private service: MatchService) {
    // this.PowerAnimateSub = service.cardAnimate$.subscribe((cardId) => {
    //   // console.log("ID: ", id)
    //   this.cardId = cardId;
    //   if(this.id == cardId){
    //     this.animatedIndex++;

    //   }
    // });
    service.cardAnimate$.subscribe(async (cardId) => {
      this.cardId = cardId;
      if(this.id == cardId){
        this.animatedIndex++;
        // await new Promise((resolve) => setTimeout(resolve, 1500));

      }
    });
    service.powerAnimate$.subscribe((powerIndex) => {
      this.animatedPowerIndex = powerIndex;

      if (this.id == this.cardId) {
        // console.log('powerIndex: ', powerIndex);
        // console.log('Id: ', this.id);
        this.animatePower();
        // this.animationCounters[powerIndex]++;
      }
    });
    // service.powerAnimate$.subscribe({
    //   next: (powerIndex) => this.animatedPowerIndex = powerIndex
    // });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    // this.PowerAnimateSub.unsubscribe();
  }

  getRarityName(rarityValue: number | undefined): string {
    switch (rarityValue) {
      case 0: {
        return 'Commun';
      }
      case 1: {
        return 'Rare';
      }
      case 2: {
        return 'Épique';
      }
      case 3: {
        return 'Légendaire';
      }
      default: {
        return '';
      }
    }
  }

  getRarityColor(rarityValue: number | undefined): string {
    switch (rarityValue) {
      case 0:
        return 'rgb(169, 169, 169)';
      case 1:
        return 'rgb(76, 175, 80)';
      case 2:
        return 'rgb(156, 39, 176)';
      case 3:
        return 'rgb(255, 87, 34)';
      default:
        return 'rgb(169, 169, 169)';
    }
  }

  ngOnInit() {
    this.oldHealth = this.health;
    this.animatedIndex = -1;
    if (this.card?.cardPowers) {
      this.animationCounters = new Array(this.card.cardPowers.length).fill(0);
    }
    // console.log(this.id, this.animatedPowerIndex)
  }

  count = 0;
  async playAllPowerAnimations() {
    if (!this.card?.cardPowers) return;

    for (let i = 0; i < this.card.cardPowers.length; i++) {
      this.animationCounters[i]++;
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }

  animatePower() {
    this.animationCounters[this.animatedPowerIndex]++;
    setTimeout(() => {
      this.animatedPowerIndex = -1;
      this.cardId = -1;
      // this.PowerAnimateSub.unsubscribe();
    }, 3000);
  }
  animateCard() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
      this.oldHealth = this.health;
    }, 1000);
  }
}
