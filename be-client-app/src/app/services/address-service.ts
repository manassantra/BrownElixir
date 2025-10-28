import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.develop';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiurl = environment.BASE_API + '/address/';
  headers: any;
  _authToken_: any;
  customerId: any;

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {
    this.getCustomerDetails();
    this.setAuthHeader();
  }

  private getCustomerDetails() {
    const match = this.document.cookie.match(('(^| )_cHoCoBiTeZ_SeSsiOn_token=([^;]+)'));
    this._authToken_ = match ? match[2] : '';
    const userData = localStorage.getItem('_cHoCoBiTeZ_SeSsiOn_data');
    const user = userData ? JSON.parse(userData) : {};
    this.customerId = user._id;
  }

  private setAuthHeader() {
    this.headers = new HttpHeaders({
      'x-api-key': environment.API_KEY,
      'x-api-secret': environment.API_SECRET,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._authToken_}`
    });
  }

  getAddressListById() {
    return this.http.get(this.apiurl + 'list/' + this.customerId, { headers: this.headers});
  }

  updateAddressById(id:any, data: any) {
    return this.http.put(this.apiurl + 'update/' + id, data, { headers: this.headers});
  }
}
