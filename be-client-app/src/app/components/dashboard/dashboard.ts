import { Component } from '@angular/core';
import { Navbar } from '../shared/navbar/navbar';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
