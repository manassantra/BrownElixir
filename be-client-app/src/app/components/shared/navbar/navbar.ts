import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar implements OnInit {
  brandName?: string;
  username?: string;

  ngOnInit(): void {
    this.brandName = "BrownElixir Inc.";
  }
}
