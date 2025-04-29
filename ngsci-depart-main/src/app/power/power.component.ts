import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CardPower, Power } from '../models/models';
import { NgIf } from '@angular/common';
import { transition, trigger, useAnimation } from '@angular/animations';
import { flip, heartBeat, tada } from 'ng-animate';

@Component({
  selector: 'app-power',
  standalone: true,
  imports: [NgIf],
  templateUrl: './power.component.html',
  styleUrl: './power.component.css',
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
export class PowerComponent implements OnInit{
  @Input() Power! : CardPower;

  @Input() animationCounters : number = 0;

  ngOnInit(): void {
  }
  async animate() {
    this.animationCounters++;

    await new Promise((resolve) => setTimeout(resolve, 1500));
      // this.animationCounters++;
  }
  test(){
    // this.animate();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.animate()    // this.Power!.animate =false;
  }
}
