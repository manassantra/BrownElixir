import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { RouterLink } from '@angular/router';
import { AddressService } from '../../services/address-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  cartItems: any[] = [];
  addressList: any[] = [];
  defaultAddress: any;
  totalItem: any = 0;
  totalAmount: any = 0;
  shippingCharges: any = 0;
  tax: any = 0;
  totalPrice: any = 0;
  paymentMethod: string = 'COD'; // Default payment method
  promoCode: string = '';
  isDisabled: boolean = false;
  discount: number = 0;

  constructor(private cartService: CartService, private location: Location,
              private addressService: AddressService) {}

  ngOnInit(): void {
    this.getCartItemList();
    setTimeout(()=>{
      if (this.totalItem > 0) {
        this.getAddressList();
      }
    }, 1500);
  }

  getAddressList() {
    this.addressService.getAddressListById().subscribe((res:any)=>{
      this.addressList = res.data;
      this.defaultAddress = this.addressList.find(addr => addr.isDefault);
    }, (err)=>{
      console.log(err.message);
    })
  }

  getCartItemList() {
    this.cartItems = this.cartService.getFromCartStorage();
    this.totalItem = this.cartService.getTotalItems();
    this.totalAmount = this.cartService.getTotalPrice();
    if (this.totalAmount > 499) {
      this.tax = 12;
      this.shippingCharges = 0;
    } else {
      this.tax = 6;
      this.shippingCharges = 30;
    }
    this.totalPrice = this.totalAmount - this.discount + this.shippingCharges + (this.totalAmount * this.tax / 100);
  }

  removeItem(id:any) {
    this.cartService.removeItem(id);
    this.getCartItemList();
  }

  changePaymentMethod() {
    console.log('Payment method changed to:', this.paymentMethod);
  }

  applyPromoCode() {
    if (this.promoCode === 'DISCOUNT10') {
      // Logic to apply promo code
      this.isDisabled = true;
      this.discount = 10;
    } else {
      alert('Invalid promo code');
      this.isDisabled = false;
    }
    this.getCartItemList();
  }

  removePromoCode() {
    this.promoCode = '';
    this.isDisabled = false;
    this.discount = 0;
    this.getCartItemList();
  }

  goBack(): void {
    this.location.back();
  }

  increaseQty(item:any) {
    this.cartService.increaseQuantity(item.id);
    this.getCartItemList();
  }

  decreaseQty(item:any) {
    this.cartService.decreaseQuantity(item.id);
    this.getCartItemList();
  }

  ngOnDestroy(): void {
    this.removePromoCode();
  }
}
