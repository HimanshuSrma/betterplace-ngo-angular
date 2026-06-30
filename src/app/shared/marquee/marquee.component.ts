import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-hidden mask-fade-x" [style.--duration]="duration + 's'">
      <div class="flex w-max gap-12 animate-marquee" [style.animation-duration]="duration + 's'">
        <div *ngFor="let _ of [0,1]" class="flex items-center gap-12 pr-12 shrink-0">
          <ng-container *ngFor="let item of items">
            <span class="text-2xl md:text-4xl font-display tracking-tight text-muted whitespace-nowrap">
              {{ item }}
            </span>
            <span class="h-2 w-2 rounded-full bg-accent-500/70"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class MarqueeComponent {
  @Input() items: string[] = [];
  @Input() duration = 30;
}
