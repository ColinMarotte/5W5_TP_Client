import { CommonModule } from '@angular/common';
import { DeckService } from './../../services/deck.service';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-mesdecks',
  templateUrl: './mesdecks.component.html',
  styleUrls: ['./mesdecks.component.css'],
  standalone: true,
  imports: [CommonModule, MatButton]
})
export class MesdecksComponent implements OnInit {

  constructor(public deckService: DeckService) { }

  ngOnInit() {
  }

  getDecks() {

  }

}
