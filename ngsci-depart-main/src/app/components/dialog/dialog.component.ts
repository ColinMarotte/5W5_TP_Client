import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
