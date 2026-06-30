import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { SplitTextDirective } from '../../directives/split-text.directive';
import { BlogBlock, BlogService } from '../../core/blog.service';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-blog-single',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, ParallaxDirective, SplitTextDirective],
  templateUrl: './blog-single.component.html'
})
export class BlogSingleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  blog = inject(BlogService);
  private seo = inject(SeoService);

  slug = signal<string>('');
  post = computed(() => this.blog.get(this.slug()));
  copied = signal(false);

  related = computed(() =>
    this.blog
      .posts()
      .filter((p) => p.slug !== this.slug())
      .slice(0, 3)
  );

  encodedShare = computed(() => {
    const p = this.post();
    if (!p) return '';
    const url = isPlatformBrowser(this.platformId) ? window.location.href : `https://betterplace.ngo/blog/${p.slug}`;
    return encodeURIComponent(`${p.title} — ${url}`);
  });

  ngOnInit() {
    this.route.params.subscribe((p) => {
      this.slug.set(p['slug']);
      const post = this.post();
      if (post) {
        this.seo.set({
          title: `${post.title} — Betterplace`,
          description: post.excerpt,
          image: post.cover
        });
        this.seo.injectJsonLd('bp-article-schema', {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          image: post.cover,
          datePublished: post.date,
          author: { '@type': 'Person', name: post.author }
        });
      }
    });
  }

  copyLink() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard?.writeText(window.location.href);
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  asP(b: BlogBlock) { return b as Extract<BlogBlock, { type: 'p' }>; }
  asH(b: BlogBlock) { return b as Extract<BlogBlock, { type: 'h' }>; }
  asQ(b: BlogBlock) { return b as Extract<BlogBlock, { type: 'quote' }>; }
  asUl(b: BlogBlock) { return b as Extract<BlogBlock, { type: 'ul' }>; }
  asTags(b: BlogBlock) { return b as Extract<BlogBlock, { type: 'hashtags' }>; }
}
