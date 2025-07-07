import { Component } from '@angular/core';
import { ProductList } from '../product-list/product-list';

@Component({
  selector: 'app-home',
  imports: [ProductList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
