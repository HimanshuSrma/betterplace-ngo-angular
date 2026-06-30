import { Directive, ElementRef, HostListener, Input, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[appMagnetic]', standalone: true })
export class MagneticDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private platformId = inject(PLATFORM_ID);
  @Input() magneticStrength = 0.35;

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    const r = this.el.nativeElement.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * this.magneticStrength;
    const y = (e.clientY - (r.top + r.height / 2)) * this.magneticStrength;
    this.el.nativeElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.style.transform = 'translate3d(0,0,0)';
  }
}
