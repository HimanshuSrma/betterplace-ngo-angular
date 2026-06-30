import { Injectable, signal, inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

export type ThemeMode = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private doc = inject(DOCUMENT);
  mode = signal<ThemeMode>('dark');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = (localStorage.getItem('bp-theme') as ThemeMode) || null;
      const prefersLight =
        window.matchMedia?.('(prefers-color-scheme: light)').matches ?? false;
      this.mode.set(saved ?? (prefersLight ? 'light' : 'dark'));
    }
    effect(() => {
      const m = this.mode();
      const html = this.doc.documentElement;
      html.classList.toggle('dark', m === 'dark');
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('bp-theme', m);
      }
    });
  }

  toggle() {
    this.mode.set(this.mode() === 'dark' ? 'light' : 'dark');
  }
}
