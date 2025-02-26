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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatTabsModule, CommonModule, MatError, MatFormField, MatCard, MatInput, MatButton]
})
export class LoginComponent implements OnInit {

  form: FormGroup<any>

  formData?: Data;

  emailInput: string | null = null;

  passwordInput: string | null = null;

  reponse: string = "";

  constructor(public httpService: HttpService, public router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    this.form.valueChanges.subscribe(() => {
      this.formData = this.form.value;
    });
  }

  ngOnInit() {
  }

  async login() {
    if(this.emailInput != null && this.passwordInput != null){
      this.reponse = await this.httpService.login(this.emailInput, this.passwordInput);
      if(this.reponse == "success"){
        this.router.navigate(['/home']);
      }
    }
  }

  toRegister(){
    this.router.navigate(['/register']);
  }

}

interface Data {
  email?: string | null;
  password?: string | null;
}
