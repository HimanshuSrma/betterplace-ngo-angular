# Betterplace - Angular Revamp

Award-tier, cinematic revamp of [betterplace.ngo](https://betterplace.ngo) - an NGO founded by **Anirudh Atrish** championing nature conservation, animal welfare, clean energy and human upliftment.

Built with **Angular 19** + SSR, **GSAP** + **Lenis** smooth scroll, **Three.js** for 3D hero, **Tailwind CSS** for utility styling, and **ngx-translate** for multilingual content.

---

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Angular 19 (standalone components, signals, SSR + hydration with event replay) |
| Styling | Tailwind CSS 3 + SCSS design tokens, dark / light mode |
| Animations | GSAP + ScrollTrigger, custom directives (`appReveal`, `appParallax`, `appMagnetic`, `appCounter`, `appSplitText`) |
| Smooth scroll | Lenis (with reduced-motion respect) |
| 3D | Three.js - interactive icosahedron hero with particle field |
| Forms | Angular Reactive Forms + Formspree endpoint |
| i18n | `@ngx-translate/core` + http loader (EN / HI scaffolded) |
| SEO | `Meta` / `Title` service, JSON-LD Organization + Article schema |
| Routing | Lazy-loaded standalone routes, view transitions, in-memory scroll restoration |

## Pages

- `/` - cinematic hero, mission, counters, causes, work strip, success story, latest stories, volunteer form
- `/donors` - members & donors grid
- `/gallery` - pinned horizontal scroll + masonry grid
- `/blog` - searchable story listing
- `/blog/:slug` - long-form story with parallax hero + related posts
- `/contact` - contact + volunteer form, WhatsApp link, email

## Run

```bash
npm install
npm start                                # dev server   -> http://localhost:4200
npm run build                            # SSR build
npm run serve:ssr:betterplace-angular    # serve SSR
```

## Content source

Original content was scraped from `../betterplace.ngo/` (static HTML). All copy is preserved - only the visual language and motion are new.

## Animation directives

```html
<h2 appSplitText>Headline that reveals word-by-word</h2>
<div appReveal [revealChildren]="'.card'" [revealStagger]="0.1">...</div>
<img appParallax [parallaxSpeed]="-0.1" src="..." />
<a appMagnetic class="btn-primary">Donate</a>
<span [appCounter]="850" counterSuffix="+">0</span>
```

## Accessibility

- All motion respects `prefers-reduced-motion`.
- Semantic landmarks (header / main / footer), focus-visible rings, color contrast on tokens.
- Forms are keyboard-friendly with explicit labels.

## SEO

- Per-route `<title>` + meta + OG tags via `SeoService.set()`.
- JSON-LD `Organization` (global) and `Article` (per blog post).

## Deploy

Any host that supports Node (Vercel, Netlify, Render, Cloudflare) - SSR is on by default.
For pure-static GitHub Pages (current `CNAME -> www.betterplace.ngo`):

```bash
ng build --configuration production
# push dist/betterplace-angular/browser/ to gh-pages
```

Crafted with care by **[Himmanshu Sharma](https://himmanshusharma.vercel.app/)**.
