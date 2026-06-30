import { Directive, ElementRef, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[appCounter]', standalone: true })
export class CounterDirective implements OnInit {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private platformId = inject(PLATFORM_ID);
  @Input('appCounter') target = 0;
  @Input() counterSuffix = '';
  @Input() counterDuration = 2;

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.textContent = `${this.target}${this.counterSuffix}`;
      return;
    }
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: this.el.nativeElement,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: this.target,
          duration: this.counterDuration,
          ease: 'power3.out',
          onUpdate: () => {
            this.el.nativeElement.textContent =
              Math.floor(obj.val).toLocaleString() + this.counterSuffix;
          }
        });
      }
    });
  }
}
