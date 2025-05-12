import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
