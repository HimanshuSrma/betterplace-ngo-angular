import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private platformId = inject(PLATFORM_ID);
  private lenis: any | null = null;

  async init() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.lenis) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const { default: Lenis } = await import('lenis');
    this.lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    const raf = (time: number) => {
      this.lenis!.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time: number) => this.lenis!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  scrollTo(target: string | HTMLElement | number, opts?: { immediate?: boolean; offset?: number }) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.lenis) {
      this.lenis.scrollTo(target as any, { immediate: opts?.immediate ?? false, offset: opts?.offset ?? 0 });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: typeof target === 'number' ? target : 0, behavior: opts?.immediate ? 'instant' as ScrollBehavior : 'smooth' });
    }
  }

  toTop(immediate = true) {
    this.scrollTo(0, { immediate });
  }
}
