import { AfterViewInit, Component, ElementRef, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { SplitTextDirective } from '../../directives/split-text.directive';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RevealDirective, SplitTextDirective],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private seo = inject(SeoService);
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

  images = [
    '/img/6.png', '/img/9.png', '/img/12.png', '/img/8.jpg', '/img/14.png', '/img/15.jpg', '/img/16.jpg', '/img/17.jpg',
    '/img/7.png', '/img/13.png', '/img/11.png', '/img/10.JPG',
    '/img/12.png',
  ];
  // '/img/8.jpg', '/img/3.png',
  // Dupe - '/img/5.jpg',

  ngOnInit() {
    this.seo.set({
      title: 'Gallery — Betterplace',
      description: 'Glimpses from Betterplace events — plantations, rescues, drives.'
    });
  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    const el = this.track.nativeElement;
    const distance = el.scrollWidth - window.innerWidth;
    if (distance <= 0) return;
    gsap.to(el, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement!,
        start: 'top top',
        end: () => `+=${distance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }
}
