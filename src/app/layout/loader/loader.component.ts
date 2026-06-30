import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="fixed inset-0 z-[100] grid place-items-center bg-ink-950 text-ink-50 animate-[fade-out_0.6s_ease_0.7s_forwards]">
      <div class="flex flex-col items-center gap-4">
        <div class="relative h-16 w-16">
          <span class="absolute inset-0 rounded-full border-2 border-accent-500/30"></span>
          <span class="absolute inset-0 rounded-full border-2 border-t-accent-500 animate-spin"></span>
        </div>
        <p class="font-display text-2xl tracking-tight">Betterplace</p>
        <p class="text-xs uppercase tracking-[0.3em] text-muted">A movement loading…</p>
      </div>
    </div>
  `,
  styles: [
    `
      :host { display: contents; }
      @keyframes fade-out { to { opacity: 0; visibility: hidden; } }
    `
  ]
})
export class LoaderComponent {}
