import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatTabsModule, CommonModule, MatError, MatFormField, MatCard, MatInput, MatButton]
})
export class RegisterComponent implements OnInit {

  form: FormGroup<any>

  formData?: Data;

  emailInput: string | null = null;

  passwordInput: string | null = null;

  passwordConfirmInput: string | null = null;

  reponse: string = "";

  constructor(public httpService: HttpService, public router: Router, private fb: FormBuilder) {
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
    const password = form.get('password')?.value;
    const passwordConfirm = form.get('passwordConfirm')?.value;

    if (!password || !passwordConfirm) {
      return null;
    }

    let samePasswords: boolean = true;

    if (password != passwordConfirm) {
      samePasswords = false;
    }

    return !samePasswords ? { passwordNotConfirmed: true } : null;
  }

  async register() {
    if(this.emailInput != null && this.passwordInput != null && this.passwordConfirmInput != null){
      this.reponse = await this.httpService.register(this.emailInput, this.passwordInput, this.passwordConfirmInput);
      if(this.reponse == "success"){
        this.router.navigate(['/home']);
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
