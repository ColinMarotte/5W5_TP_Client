import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput } from '@angular/material/input';

@Component({
  selector: 'app-createdeckdialog',
  templateUrl: './createdeckdialog.component.html',
  styleUrls: ['./createdeckdialog.component.css'],
  standalone: true,
  imports: [MatButton, MatInput, MatFormField, MatFormFieldModule, MatDialogModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class CreatedeckdialogComponent implements OnInit {

  deckNameInput: string | null = null;

  form: FormGroup<any>;

  formData?: Data;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreatedeckdialogComponent>) {
    this.form = this.fb.group({
      deckName: ["", [Validators.required]]
    });

    this.form.valueChanges.subscribe(() => {
      this.formData = this.form.value;
    });
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.deckNameInput);
  }

  close() {
    this.dialogRef.close();
  }

}

interface Data {
  deckName?: string | null;
}