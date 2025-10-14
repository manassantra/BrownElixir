import { DOCUMENT, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.develop';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_KEY = environment.CART_KEY;
  private cartList: CartItem[] = [];
  private isBrowser: boolean;

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.cartList = this.getFromCartStorage();
    this.updateCart();
  }

  private filterProductProperties(product: any): CartItem {
    const keysToRemove = [
      '_id', 'createdDate', 'createdBy', '__v', 'minQty', 'maxQty',
      'isApproved', 'stock', 'description', 'flavor', 'unitWeight',
      'ingredients', 'productCode', 'productBrand', 'categoryName', 'inStock'
    ];
    const filtered = Object.fromEntries(
      Object.entries(product).filter(([key]) => !keysToRemove.includes(key))
    );
    return {
      ...filtered,
      qty: Number(product.qty) || 1, // Default to 1 if not present
      id: product.id,
      productName: product.productName,
      imgUrl: product.imgUrl,
      unitPrice: product.unitPrice || product.price
    } as CartItem;
  }

  private saveToCartStorage() {
    if (this.isBrowser) {
      sessionStorage.setItem(this.CART_KEY, JSON.stringify(this.cartList));
    }
  }

  getFromCartStorage(): CartItem[] {
    if (this.isBrowser) {
      const data = sessionStorage.getItem(this.CART_KEY);
      try {
        return data ? JSON.parse(data) : [];
      } catch(err) {
        console.log(err);
        return [];
      }
    }
    return [];
  }

  addToCart(product: any): void {
    const item = this.filterProductProperties(product);
    this.cartList = this.getFromCartStorage();
    const index = this.cartList && this.cartList?.length ? this.cartList.findIndex(p => p.id === item.id) : Number('-1');
    if (index > -1) {
      // If item already exists, increase qty (up to 5)
      if (this.cartList[index].qty < 5 && this.cartList[index].qty + item.qty <= 5) {
        this.cartList[index].qty += item.qty;
      } else if (this.cartList[index].qty < 5 && this.cartList[index].qty + item.qty > 5) {
        this.cartList[index].qty = 5;
        this.alertMaxQty();
      } else if (this.cartList[index].qty >=5) {
        this.alertMaxQty();
      }
    } else {
      this.cartList.push(item);
    }

    this.saveToCartStorage();
    this.updateCart();
  }

  increaseQuantity(id: string): void {
    this.cartList = this.getFromCartStorage();
    const product = this.cartList.find(p => p.id === id);
    if (product && product.qty < 5) {
      product.qty += 1;
      this.saveToCartStorage();
      this.updateCart();
    } else {
      this.alertMaxQty();
    }
  }

  decreaseQuantity(id: string): void {
    this.cartList = this.getFromCartStorage();
    const product = this.cartList.find(p => p.id === id);
    if (product && product.qty > 1) {
      product.qty -= 1;
      this.saveToCartStorage();
      this.updateCart();
    }
  }

  removeItem(id: string): void {
    this.cartList = this.getFromCartStorage();
    this.cartList = this.cartList.filter(p => p.id !== id);
    this.saveToCartStorage();
    this.updateCart();
  }

  clearCartStorage(): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(this.CART_KEY);
    }
    this.cartList = [];
    this.cartCountSubject.next(0);
  }

  getTotalItems(): number {
    this.cartList = this.getFromCartStorage();
    return this.cartList.reduce((acc, item) => acc + (Number(item.qty) || 0), 0);
  }

  getTotalPrice(): number {
    this.cartList = this.getFromCartStorage();
    return this.cartList.reduce((acc, item) => acc + ((Number(item.qty) || 0) * (Number(item.unitPrice) || 0)), 0);
  }

  updateCart(): void {
    this.cartList = this.getFromCartStorage();
    const totalQty = this.cartList.reduce((acc, item) => acc + (Number(item.qty) || 0), 0);
    this.cartCountSubject.next(totalQty);
  }

  alertMaxQty(){
    window.alert("You can add 5 Qty at a time !");
  }
}
