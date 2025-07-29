import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class Account {

  userName: any;
  currentDateTime: Date = new Date();

  constructor(private authServices: Auth) {
    const userData = localStorage.getItem('_cHoCoBiTeZ_SeSsiOn_data');
    const user = userData ? JSON.parse(userData) : {};
    this.userName = user.user;
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  logoutSession() {
    this.authServices.logoutSession();
  }

}
