import { Component, inject, signal, PLATFORM_ID, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { CursorComponent } from './layout/cursor/cursor.component';
import { SeoService } from './core/seo.service';
import { SmoothScrollService } from './core/smooth-scroll.service';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, LoaderComponent, CursorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private seo = inject(SeoService);
  private scroll = inject(SmoothScrollService);
  theme = inject(ThemeService);
  loading = signal(true);

  ngOnInit() {
    this.seo.injectOrganizationSchema();
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        if (!isPlatformBrowser(this.platformId)) return;
        const url: string = e.urlAfterRedirects || e.url || '';
        if (url.includes('#')) return;
        requestAnimationFrame(() => this.scroll.toTop(true));
      });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scroll.init();
    setTimeout(() => this.loading.set(false), 900);
  }
}
