import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlayableCard } from 'src/app/models/models';
import { CardComponent } from '../../components/card/card.component';
import { MatchService } from 'src/app/services/match.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { flip, shakeY } from 'ng-animate';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
    selector: 'app-battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.css'],
    standalone: true,
    imports: [CardComponent,  CommonModule],
    animations: [trigger('test', [
          transition(
            ':increment',
            useAnimation(shakeY, {
              params: { timing: 1 },
            })
          ),
        ]),]
})
export class BattlefieldComponent implements OnInit, OnChanges {

  @Input() cards: PlayableCard[] = [];
  @Input() align: string = 'top';
  @Input() playerId: number = -1;
  isCurrentPlayer:boolean = false
  animationCounters: number[] = [0,0,0,0,0,0,0,0,0,0];
  constructor(matchService : MatchService) { 
    matchService.cardActivate$.subscribe( (activate) => {

        // console.log("Before")
        // console.log(this.cards);
        // console.log("ActivateCard:" ,this.cards[activate])
        // console.log('animationsCounter: ', this.animationCounters)
        // // this.bool = activate;
        if(Number.isNaN(this.animationCounters[activate])){

          this.animationCounters[activate]= 0;
        }
        if(activate >=0 ){
          this.animationCounters[activate]++;
          // console.log("After")
          console.log("ActivateCard:" ,this.cards[activate])
          // console.log('animationsCounter: ', this.animationCounters)
          setTimeout(() => {
          this.animationCounters[activate]--;

          }, 1000);
        }
    });
  }
  ngOnChanges(changes: SimpleChanges): void { 
    if (this.cards.length > 0 && this.cards != undefined) {
      // this.animationCounters = new Array(this.cards.length).fill(0);
    }
  }

  ngOnInit() {
    if (this.cards.length > 0 && this.cards != undefined) {
      // this.animationCounters = new Array(this.cards.length).fill(0);
    }
  }

}
