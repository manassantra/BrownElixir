import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  cartItems: any[] = [];
  totalItem: any = 0;
  totalAmount: any = 0;
  shippingCharges: any = 0;
  tax: any = 0;
  totalPrice: any = 0;

  constructor(private cartService: CartService, private location: Location) {}

  ngOnInit(): void {
    this.getCartItemList();
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
    this.totalPrice = this.totalAmount + this.shippingCharges + (this.totalAmount * this.tax / 100);
  }

  removeItem(id:any) {
    this.cartService.removeItem(id);
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
}
