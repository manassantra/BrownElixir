import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';  // ✅ Assuming this is an injectable service

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.html',
  styleUrls: ['./account.css']  // ✅ Corrected to 'styleUrls'
})
export class Account {

  userDetails: any;
  currentDateTime: Date = new Date();

  constructor(private authServices: Auth) {  // ✅ Injected service
    const userData = localStorage.getItem('_cHoCoBiTeZ_SeSsiOn_token');
    const user = userData ? JSON.parse(userData) : {};
    this.userDetails = user;
    
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  logoutSession() {
    this.authServices.logoutSession();
  }

}
