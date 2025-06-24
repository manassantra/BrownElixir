import { Component } from '@angular/core';
import { Navbar } from '../shared/navbar/navbar';
import { Sidenav } from '../shared/sidenav/sidenav';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidenav],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
