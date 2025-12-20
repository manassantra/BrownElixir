import { CommonModule, Location } from '@angular/common';
import { ProductService } from '../../services/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {

  id!: string;
  product: any;
  selectedQty: number = 0;
  quantityOptions: number[] = [];
  loading = false;

  constructor(private location: Location, private route: ActivatedRoute,
    private productService: ProductService, private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    await this.getProductDetails();
    this.cartService.updateCart();
  }

  async getProductDetails() {
    this.loading = true;
    this.productService.getProductDetails(this.id).subscribe(async (data)=>{
      this.product = data.data;
      if (this.product.stock > 5) {
        this.product.stock = '5+';
      } else if (this.product.stock === 0) {
        this.product.stock = 'Out of Stock'
      }
      await this.generateQtyOptions();
      this.loading = false;
    }, (err)=> {
      console.log(err.error);
    })
  }

  async generateQtyOptions() {
    const min = this.product.minQty || 1;
    const max = this.product.stock < 5 ? this.product.stock : this.product.maxQty;

    this.quantityOptions = [];
    for (var i = min; i <= max; i++) {
      this.quantityOptions.push(i);
    }

    this.selectedQty = min;
    this.product.qty = this.selectedQty;
  }

  selectQty() {
    this.product.qty = Number(this.selectedQty);
  }

  goBack(): void {
    this.location.back();
  }

  addToCart(product:any) {
    if (!product) return;
    this.cartService.addToCart(product);
  }
}
