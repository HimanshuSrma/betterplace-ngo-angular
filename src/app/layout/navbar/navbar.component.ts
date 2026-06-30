import { Component, HostListener, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MagneticDirective],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  theme = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);
  scrolled = signal(false);
  open = signal(false);

  links = [
    { path: '/', label: 'Home' },
    { path: '/donors', label: 'Donors' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Stories' },
    { path: '/contact', label: 'Contact' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrolled.set(window.scrollY > 30);
  }
}
