import { Component, Input, OnInit } from '@angular/core';
import { PlayableCard } from 'src/app/models/models';
import { CardComponent } from '../../components/card/card.component';
import { MatchService } from 'src/app/services/match.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { flip, shakeY } from 'ng-animate';


@Component({
    selector: 'app-battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.css'],
    standalone: true,
    imports: [CardComponent],
    animations: [trigger('trigger', [
          transition(
            ':increment',
            useAnimation(shakeY, {
              params: { timing: 1 },
            })
          ),
        ]),]
})
export class BattlefieldComponent implements OnInit {

  @Input() cards: PlayableCard[] = [];
  @Input() align: string = 'top';
  test = 0;
  bool = false;
  constructor(matchService : MatchService) { 
    // matchService.cardActivate$.subscribe((activate) => {
    //   if(this.cards.length > 0){

    //     // this.bool = activate;
    //     if(activate){
    //       this.test++;
    //     }
          
    //       setTimeout(() => {
    //         // this.PowerAnimateSub.unsubscribe();
    //         this.bool = false;
    //       }, 3000);
        
    //   }

      
    // });
  }

  ngOnInit() {
  }
  receiveMessage($event:boolean){
    if($event){
      this.test++;
    }
  }
}
