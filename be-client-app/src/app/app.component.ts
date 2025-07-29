import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';
import { Footer } from './components/shared/footer/footer';
import { CommonModule } from '@angular/common';
import { Auth } from './services/auth';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  showHeaderFooter = true;
  currentPath?: string;

  constructor(private authService: Auth, private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    if (typeof window !== 'undefined') {
      const newPath = window.location.pathname;
      if (this.currentPath !== newPath) {
        this.currentPath = newPath;
        if ((this.currentPath === '/login' || this.currentPath === '/signup') && !this.authService.isSecuredLoggedIn()) {
          this.showHeaderFooter = false;
        }
        this.cdr.detectChanges();
      }
    }
  }
}
