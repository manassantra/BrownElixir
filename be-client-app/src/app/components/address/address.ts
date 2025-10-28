import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address-service';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any; // Import Bootstrap JS modal globally

@Component({
  selector: 'app-address',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './address.html',
  styleUrl: './address.css'
})
export class Address implements OnInit {

  isAddressData: Boolean = false;
  addressList: any[] = [];
  selectedAddress: any = null;
  editModal: any;

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

  openEditModal(address: any) {
    this.selectedAddress = { ...address }; // clone to avoid direct mutation
    const modalEl = document.getElementById('editModal');
    this.editModal = new bootstrap.Modal(modalEl);
    this.editModal.show();
  }

  saveChanges() {
    let id = this.selectedAddress.id;
    this.addressService.updateAddressById(id, this.selectedAddress).subscribe((res:any)=>{
      console.log(res);
    }, (err: any)=>{
      console.log(err.error);
    })
    this.editModal.hide();
  }

  addNewAddress() {

  }

  setDefault(data:any) {

  }

  removeAddress(address:any) {
    
  }

  goBack(): void {
    this.location.back();
  }
}
