import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  apiurl = environment.BASE_API + '/customer/auth/';
  user: any;
  response: any;
  constructor(private http: HttpClient) {
  }

  loginSession(model: any) {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY,
      'x-api-secret': environment.API_SECRET,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiurl + 'signin' , model, { headers }).pipe(map((res)=>{
      console.log(model);
      this.response = res;
      this.setCurrentUser(this.response);
    }));
  }

  // tslint:disable-next-line:typedef
  setCurrentUser(user: User) {
    this.user = localStorage.setItem('_cHoCoBiTeZ_SeSsiOn_token', JSON.stringify(user));
    this.currentUserSource.next(user);
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
