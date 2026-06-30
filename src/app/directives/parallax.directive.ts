import { Directive, ElementRef, Input, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[appParallax]', standalone: true })
export class ParallaxDirective implements OnInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private platformId = inject(PLATFORM_ID);
  @Input() parallaxSpeed = -0.15;
  private st: any;

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    this.st = gsap.to(this.el.nativeElement, {
      yPercent: this.parallaxSpeed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: this.el.nativeElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  ngOnDestroy() {
    this.st?.kill();
  }
}
