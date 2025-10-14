import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.develop';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  apiurl = environment.BASE_API + '/prod-category/';
  headers: any;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
        'x-api-key': environment.API_KEY,
        'x-api-secret': environment.API_SECRET,
        'Content-Type': 'application/json'
    });
  }

  getAllCategories() {
    return this.http.get(this.apiurl + 'list', { headers: this.headers});
  }
}
