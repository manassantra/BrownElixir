import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {

  products: any[] = [];
  totalProducts = 0;
  page = 1;
  limit = 6;
  loading = false;

  // Filters & Sorting
  category = '';
  brand = '';
  flavor = '';
  inStock: boolean | null = null;
  search = '';
  sortOrder = 'asc';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    // Subscribe to route params to handle dynamic changes
    this.route.paramMap.subscribe(params => {
      const data = params.get('data') || 'All';
      this.flavor = (data === 'All') ? '' : data;
      this.page = 1;
      this.products = [];
      this.loadProducts();
    });
  }

  loadProducts() {
    if (this.loading) return;
    this.loading = true;

    const filters = {
      category: this.category,
      brand: this.brand,
      flavor: this.flavor,
      inStock: this.inStock,
      search: this.search,
      sort: this.sortOrder,
      page: this.page,
      limit: this.limit
    };

    this.productService.getAllProducts(filters).subscribe({
      next: (response) => {
        this.products = [...this.products, ...response.data];
        this.totalProducts = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err.message || err);
        this.loading = false;
      }
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100 && !this.loading) {
      if (this.products.length < this.totalProducts) {
        this.page++;
        this.loadProducts();
      }
    }
  }

  applyFilters() {
    this.page = 1;
    this.products = [];
    this.loadProducts();
  }

  selectFlavor(value: string) {
    this.flavor = value;
    this.applyFilters();

    // Navigate with absolute path
    this.router.navigate(['/product-list', value || 'All']);
  }
}
