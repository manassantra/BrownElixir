import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category-service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart-service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {


  products: any[] = [];
  totalProducts = 0;
  page = 1;
  limit = 2;  // Start with 6 products
  loading = false;

  // Filters & Sorting
  category = '';
  brand = '';
  flavor = '';
  inStock: boolean | null = null;
  search = '';
  sortOrder = 'asc';
  productCategories: any;

  constructor(private categoryService: CategoryService, private productService: ProductService, private route: ActivatedRoute,
    private router: Router, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.flavor = this.route.snapshot.paramMap.get('data')!;
    if (this.flavor === 'All') {
      this.flavor = "";
    }
    this.loadProducts();
    this.getAllCategories();
  }

  loadProducts() {
    if (this.loading) return;  // Prevent multiple triggers
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

    this.productService.getAllProducts(filters).subscribe(response => {
      this.products = [...this.products, ...response.data];
      this.totalProducts = response.total;
      this.loading = false;
    }, error => {
      console.error('Error:', error.message);
      this.loading = false;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100 && !this.loading) {
  //     if (this.products.length < this.totalProducts) {
  //       this.page++;
  //       this.loadProducts();
  //     }
  //   }
  // }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((data)=>{
      this.productCategories = data;
    }, (err)=>{
      console.log(err.message);
    })
  }

  goToThisVariant(data:any) {
    location.replace('product-list/' + data);
  }
}
