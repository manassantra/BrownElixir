import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT, Inject, Injectable } from '@angular/core';
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
  response: any;
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
  }

  loginSession(model: any) {
    const headers = new HttpHeaders({
      'x-api-key': environment.API_KEY,
      'x-api-secret': environment.API_SECRET,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiurl + 'signin' , model, { headers }).pipe(map((res)=>{
      this.response = res;
      this.setCurrentUser(this.response);
    }));
  }

  setCurrentUser(user: User) {
    const days = 7;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    this.document.cookie = `_cHoCoBiTeZ_SeSsiOn_token=${this.response.authToken}; path=/; expires=${expires}; Secure; SameSite=None`;
    delete user.authToken;
    localStorage.setItem('_cHoCoBiTeZ_SeSsiOn_data', JSON.stringify(user));
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

  getSessionToken() {
    const match = this.document.cookie.match(('(^| )_cHoCoBiTeZ_SeSsiOn_token=([^;]+)'));
    return match ? match[2] : null;
  }

  isSecuredLoggedIn(): boolean {
    return (!this.isAuthTokenExpired(this.getSessionToken()) && !!this.getSessionToken());
  }

  logoutSession() {
    localStorage.removeItem('_cHoCoBiTeZ_SeSsiOn_data');
    this.document.cookie = `_cHoCoBiTeZ_SeSsiOn_token=;`;
    this.currentUserSource.next({} as User);
    window.location.replace('');
  }
}
