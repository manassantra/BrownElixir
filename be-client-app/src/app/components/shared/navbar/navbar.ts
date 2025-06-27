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
  tagLine?: string;
  username?: string;

  ngOnInit(): void {
    this.brandName = "BrownElixir Inc.";
    this.tagLine = "Indulge in the Sweetest Moments";
  }
}
