import { Component, ElementRef, HostListener, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #ring
      class="pointer-events-none fixed top-0 left-0 z-[80] hidden md:block h-8 w-8 rounded-full border border-accent-500/60 mix-blend-difference transition-[width,height,opacity] duration-300 will-change-transform"
      [class.opacity-0]="!active"
      style="transform: translate3d(-100px,-100px,0)"></div>
    <div
      #dot
      class="pointer-events-none fixed top-0 left-0 z-[80] hidden md:block h-1.5 w-1.5 rounded-full bg-accent-500 mix-blend-difference will-change-transform"
      [class.opacity-0]="!active"
      style="transform: translate3d(-100px,-100px,0)"></div>
  `
})
export class CursorComponent implements OnInit {
  @ViewChild('ring', { static: true }) ringEl!: ElementRef<HTMLDivElement>;
  @ViewChild('dot', { static: true }) dotEl!: ElementRef<HTMLDivElement>;
  private platformId = inject(PLATFORM_ID);
  active = false;
  private mx = 0;
  private my = 0;
  private rx = 0;
  private ry = 0;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.active = true;
    const loop = () => {
      this.rx += (this.mx - this.rx) * 0.18;
      this.ry += (this.my - this.ry) * 0.18;
      this.ringEl.nativeElement.style.transform = `translate3d(${this.rx - 16}px,${this.ry - 16}px,0)`;
      this.dotEl.nativeElement.style.transform = `translate3d(${this.mx - 3}px,${this.my - 3}px,0)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  @HostListener('document:mousemove', ['$event'])
  onMove(e: MouseEvent) {
    this.mx = e.clientX;
    this.my = e.clientY;
  }
}
