import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tri',
  templateUrl: './tri.component.html',
  standalone: true,
  imports: [CardComponent, FormsModule],
  styleUrls: ['./tri.component.css']
})
export class TriComponent implements OnInit {

  @Input() listecartes: any[] = [];
  croissant: String | undefined;
  constructor() { }

  ngOnInit() {
  }

}
