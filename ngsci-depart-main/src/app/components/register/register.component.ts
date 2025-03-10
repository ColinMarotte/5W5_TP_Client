import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatTabsModule, CommonModule, MatError, MatFormField, MatFormFieldModule, MatCard, MatInput, MatButton, MatSnackBarModule, MatIconModule, MatCardModule]
})
export class RegisterComponent implements OnInit {

  hide = true;

  form: FormGroup<any>

  formData?: Data;

  emailInput: string | null = null;

  passwordInput: string | null = null;

  passwordConfirmInput: string | null = null;

  reponse: string = "";

  constructor(public httpService: HttpService, public router: Router, private fb: FormBuilder, public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, this.passwordValidator]],
      passwordConfirm: ["", [Validators.required]]
    },
      { validators: [this.passwordConfirmValidator] });

    this.form.valueChanges.subscribe(() => {
      this.formData = this.form.value;
    });
  }

  ngOnInit() {
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password) {
      return null;
    }

    let passwordLengthValid: boolean = true;

    if (password.length < 6) {
      passwordLengthValid = false;
    }

    return !passwordLengthValid ? { passwordLengthError: true } : null;
  }

  passwordConfirmValidator(form: AbstractControl): ValidationErrors | null {
    const passwordControl = form.get('password');
    const passwordConfirmControl = form.get('passwordConfirm');

    if (!passwordControl?.value || !passwordConfirmControl?.value) {
      return null;
    }

    if (passwordControl.errors && !passwordControl.errors?.['passwordNotConfirmed']) {
      return null;
    }

    if (passwordControl.value !== passwordConfirmControl.value) {
      passwordControl.setErrors({ passwordNotConfirmed: true });
      passwordConfirmControl.setErrors({ passwordNotConfirmed: true });
      return { passwordNotConfirmed: true };
    } else {
      passwordControl.setErrors(null);
      passwordConfirmControl.setErrors(null);
      return null;
    }
  }

  async register() {
    if(this.emailInput != null && this.passwordInput != null && this.passwordConfirmInput != null){
      this.reponse = await this.httpService.register(this.emailInput, this.passwordInput, this.passwordConfirmInput);
      if(this.reponse == "success"){
        this.router.navigate(['/home']);
        this.snackBar.open('Inscription réussie!', 'OK', { duration: 5000 });
      }
    }
  }

  toLogin(){
    this.router.navigate(['/login']);
  }

}

interface Data {
  email?: string | null;
  password?: string | null;
  passwordConfirm?: string | null;
}
