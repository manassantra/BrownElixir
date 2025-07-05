import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Notyf } from 'notyf';
import { map, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  apiurl = environment.base_api + '/customer/auth/';
  user: any;
  response: any;
  notyf = new Notyf();
  constructor(private http: HttpClient) { 
  }

  loginSession(model: any, reqBackUrl: any) {
    return this.http.post(this.apiurl + 'signin' , model ).pipe(map((res)=>{
      this.response = res;
      this.setCurrentUser(this.response, reqBackUrl);
    }));
  }

  // tslint:disable-next-line:typedef
  setCurrentUser(user: User, url: any) {
    this.user = localStorage.setItem('bongAuth', JSON.stringify(user));
    this.currentUserSource.next(user);
    setTimeout(()=>{
      window.location.replace(url);
    }, 2000)
  }

  isAuthTokenExpired(token:any): boolean {
    if (!token) {
      return true;
    }
    const decodedToken: any = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert from seconds to milliseconds
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }

  logoutSession() {
    localStorage.removeItem('_cHoCoBiTeZ_SeSsiOn_token');
    this.currentUserSource.next(this.user);
    window.location.replace('');
  }
}
