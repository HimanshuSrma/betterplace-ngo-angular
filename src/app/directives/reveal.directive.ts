import { Directive, ElementRef, Input, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private st: any;

  @Input() revealY = 40;
  @Input() revealDelay = 0;
  @Input() revealDuration = 0.9;
  @Input() revealStagger = 0.08;
  @Input() revealChildren?: string;

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    const targets = this.revealChildren
      ? this.el.nativeElement.querySelectorAll(this.revealChildren)
      : [this.el.nativeElement];
    gsap.set(targets, { y: this.revealY, opacity: 0 });
    this.st = ScrollTrigger.create({
      trigger: this.el.nativeElement,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: this.revealDuration,
          delay: this.revealDelay,
          stagger: this.revealStagger,
          ease: 'expo.out'
        });
      }
    });
  }

  ngOnDestroy() {
    this.st?.kill();
  }
}
