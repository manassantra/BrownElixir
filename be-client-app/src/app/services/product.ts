import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Product {

  apiurl = environment.BASE_API + '/product/';
  headers: any;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'x-api-key': environment.API_KEY,
      'x-api-secret': environment.API_SECRET,
      'Content-Type': 'application/json'
    });
   }

  getAllProducts(filters: any = {}): Observable<any> {
    let params = new HttpParams();

    for (const key in filters) {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    }

    return this.http.get(this.apiurl + 'list', { headers: this.headers, params });
  }
}
