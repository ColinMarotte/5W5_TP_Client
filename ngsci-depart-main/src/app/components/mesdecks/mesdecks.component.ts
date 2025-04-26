import { CommonModule } from '@angular/common';
import { DeckService } from './../../services/deck.service';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Deck } from 'src/app/models/models';
import { DeckComponent } from "../deck/deck.component";
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { CreatedeckdialogComponent } from '../createdeckdialog/createdeckdialog.component';
import { MatIconModule } from '@angular/material/icon';
import { DeckConfigDTO } from 'src/app/models/dtos';

@Component({
  selector: 'app-mesdecks',
  templateUrl: './mesdecks.component.html',
  styleUrls: ['./mesdecks.component.css'],
  standalone: true,
  imports: [CommonModule, MatButton, DeckComponent, MatDialogModule, CreatedeckdialogComponent, MatIconModule]
})
export class MesdecksComponent implements OnInit {

  mesDecks: Deck[] = [];

  deckNameOutput: string | null = null;

  deckConfig: DeckConfigDTO | null = null;

  constructor(public deckService: DeckService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.getDecks();
    this.deckConfig = await this.deckService.getDeckConfig();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CreatedeckdialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("CreateDeck Dialog output:", data)
      if (data != undefined) {
        this.deckNameOutput = data;
        this.createDeck(this.deckNameOutput!)
      }
    });
  }

  async getDecks() {
    this.mesDecks = await this.deckService.getDecks();
  }

  async createDeck(name: string) {
    this.mesDecks = await this.deckService.createDeck(name);
  }

  isNbDeckMaxReached(): boolean {
    if(this.deckConfig == null){
      return true;
    }

    if(this.mesDecks.length >= this.deckConfig.nbDecksMax) {
      return true;
    } else {
      return false;
    }
  }
}
