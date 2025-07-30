import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { Notyf } from 'notyf';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  notyf = new Notyf();
  returnUrl: string = '/';
  loading = false;

  constructor(private fb: FormBuilder, private authServices: Auth,
    private location: Location, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmitLoginData() {
    this.loading = true;
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
        this.loading = false;
        return;
    }
    const loginData = this.loginForm?.value;
    this.authServices.loginSession(loginData)
    .subscribe(
      (res)=>{
        this.notyf.success("Login Successful !");
        setTimeout(()=>{
          window.location.replace(this.returnUrl);
        }, 2500);
      }, (err)=>{
        this.loading = false;
        this.notyf.error(err.error);
      });
  }

}
