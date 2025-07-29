import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address-service';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-address',
  imports: [CommonModule, RouterModule],
  templateUrl: './address.html',
  styleUrl: './address.css'
})
export class Address implements OnInit {

  isAddressData: Boolean = false;
  addressList: any[] = [];

  constructor(private addressService: AddressService, private location: Location) {}

  ngOnInit(): void {
    this.getAddressess();
  }

  getAddressess() {
    this.addressService.getAddressListById().subscribe((res: any)=>{
      this.addressList = res.data;
      if (this.addressList && this.addressList.length) {
        this.isAddressData = true;
      }
    }, (err)=>{
      console.log(err.message);
    })
  }

  goBack(): void {
    this.location.back();
  }
}
