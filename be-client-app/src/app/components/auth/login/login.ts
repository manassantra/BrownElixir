import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  isSubmitted = false;
  notyf = new Notyf();

  constructor(private fb: FormBuilder, private authServices: Auth) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitLoginData() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    const loginData = this.loginForm?.value;
    this.authServices.loginSession(loginData)
    .subscribe(
      (res)=>{
        this.notyf.success("Login Successful !");
        setTimeout(()=>{
          window.location.replace('');
        }, 2500);
      }, (err)=>{
        this.notyf.error(err.error.message);
      });
  }

}
