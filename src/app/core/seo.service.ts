import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  set(opts: { title?: string; description?: string; image?: string; url?: string }) {
    if (opts.title) {
      this.title.setTitle(opts.title);
      this.meta.updateTag({ property: 'og:title', content: opts.title });
      this.meta.updateTag({ name: 'twitter:title', content: opts.title });
    }
    if (opts.description) {
      this.meta.updateTag({ name: 'description', content: opts.description });
      this.meta.updateTag({ property: 'og:description', content: opts.description });
    }
    if (opts.image) this.meta.updateTag({ property: 'og:image', content: opts.image });
    if (opts.url) this.meta.updateTag({ property: 'og:url', content: opts.url });
  }

  injectOrganizationSchema() {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      name: 'Betterplace',
      legalName: 'Betterplace NGO',
      url: 'https://betterplace.ngo',
      logo: 'https://betterplace.ngo/img/1.png',
      founder: { '@type': 'Person', name: 'Anirudh Atrish' },
      areaServed: 'IN',
      address: { '@type': 'PostalAddress', addressLocality: 'Gurugram', addressCountry: 'India' },
      email: 'betterplacengo@gmail.com',
      sameAs: []
    };
    this.injectJsonLd('bp-org-schema', data);
  }

  injectJsonLd(id: string, data: unknown) {
    const head = this.doc.querySelector('head');
    if (!head) return;
    let s = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!s) {
      s = this.doc.createElement('script');
      s.id = id;
      s.type = 'application/ld+json';
      head.appendChild(s);
    }
    s.textContent = JSON.stringify(data);
  }
}
