import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, NgOptimizedImage],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public menuOpen = false;

    toggleMenu(): void {
      this.menuOpen = !this.menuOpen;

      document.body.style.overflow = this.menuOpen
        ? 'hidden'
        : '';
    }

    closeMenu(): void {
      this.menuOpen = false;
      document.body.style.overflow = '';
    }

    public logo_soto = 'images/branding/LogoAndres.png'
    //public logo = 'images/branding/Logo.png'

    
  }

  