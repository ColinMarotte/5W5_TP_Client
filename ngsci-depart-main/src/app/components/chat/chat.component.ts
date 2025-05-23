import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule]
})
export class ChatComponent implements OnInit, OnDestroy {

  private messageSubscription!: Subscription;

  message: string = "";

  messages: string[] = [];

  usersList: string[] = [];

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.messageSubscription = this.matchService.message$.subscribe(newMessage => {
      console.log('Message reçu :', newMessage);
      this.messages.push(newMessage);
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  sendMessage() {
    if (this.message != "") {
      this.matchService.sendMessage(this.message);
      this.message = "";
    }
  }

}
