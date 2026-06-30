import { Directive, ElementRef, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[appSplitText]', standalone: true })
export class SplitTextDirective implements OnInit {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private platformId = inject(PLATFORM_ID);
  @Input() splitDelay = 0;
  @Input() splitStagger = 0.04;

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const node = this.el.nativeElement;
    const text = (node.textContent ?? '').trim();
    if (!text) return;
    const words = text.split(/\s+/);
    node.innerHTML = words
      .map(
        (w) =>
          `<span class="inline-block overflow-hidden align-baseline"><span class="inline-block translate-y-full opacity-0 will-change-transform" data-w>${w}&nbsp;</span></span>`
      )
      .join('');
    if (reduce) {
      node.querySelectorAll<HTMLElement>('[data-w]').forEach((el) => {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      });
      return;
    }
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: node,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        gsap.to(node.querySelectorAll('[data-w]'), {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.out',
          delay: this.splitDelay,
          stagger: this.splitStagger
        })
    });
  }
}
