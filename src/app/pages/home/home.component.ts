import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { RevealDirective } from '../../directives/reveal.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { CounterDirective } from '../../directives/counter.directive';
import { SplitTextDirective } from '../../directives/split-text.directive';
import { MarqueeComponent } from '../../shared/marquee/marquee.component';
import { Hero3dComponent } from '../../shared/hero3d/hero3d.component';
import { BlogService } from '../../core/blog.service';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    RevealDirective,
    ParallaxDirective,
    MagneticDirective,
    CounterDirective,
    SplitTextDirective,
    MarqueeComponent,
    Hero3dComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private seo = inject(SeoService);
  blog = inject(BlogService);

  marqueeItems = [
    'Plant',
    'Protect',
    'Uplift',
    'Coexist',
    'Conserve',
    'Restore',
    'Care',
    'Belong'
  ];

  causes = [
    {
      icon: 'leaf',
      title: 'Nature Conservation',
      text: 'Reforestation, water revival and ecological restoration across the Indian subcontinent.'
    },
    {
      icon: 'paw',
      title: 'Animal Welfare',
      text: 'Rescue and feeding programs for cattle, strays and wildlife - five minutes can save a life.'
    },
    {
      icon: 'sun',
      title: 'Clean Energy',
      text: 'Championing the transition to renewable, distributed and inclusive energy systems.'
    },
    {
      icon: 'heart',
      title: 'Human Upliftment',
      text: 'Skilling, education and dignity-first community programs that lift entire ecosystems.'
    }
  ];

  stats = [
    { value: 850, suffix: '+', label: 'Trees planted' },
    { value: 120, suffix: '+', label: 'Animals helped' },
    { value: 42, suffix: '', label: 'Active volunteers' },
    { value: 3, suffix: '', label: 'States touched' }
  ];

  workImages = [
    '/img/6.png', '/img/9.png', '/img/12.png', '/img/8.jpg', '/img/14.png', '/img/15.jpg', '/img/16.jpg', '/img/17.jpg',
    '/img/7.png', '/img/13.png', '/img/11.png', '/img/10.JPG',
    '/img/12.png',
  ];

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    number: ['', Validators.required],
    occupation: [''],
    amount: ['']
  });
  sending = false;
  sent = false;
  error = '';

  ngOnInit() {
    this.seo.set({
      title: 'Betterplace - A Better Place For All',
      description:
        'Nature conservation. Animal welfare. Clean energy. Human upliftment. Founded by Anirudh Atrish.',
      url: 'https://betterplace.ngo/'
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending = true;
    this.error = '';
    const data = this.form.value;
    this.http
      .post('https://formspree.io/f/myzwzpvj', data, {
        headers: { Accept: 'application/json' }
      })
      .subscribe({
        next: () => {
          this.sent = true;
          this.sending = false;
          this.form.reset();
        },
        error: () => {
          this.error = 'Something went wrong. Please try again or email betterplacengo@gmail.com.';
          this.sending = false;
        }
      });
  }

  iconPath(name: string) {
    switch (name) {
      case 'leaf':
        return 'M11 3C7 7 4 11 4 15a7 7 0 0 0 14 0c0-2-1-4-3-6M11 3c6 0 9 4 9 9';
      case 'paw':
        return 'M5 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 19a5 5 0 0 1 10 0v1H7z';
      case 'sun':
        return 'M12 3v2M12 19v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z';
      case 'heart':
      default:
        return 'M12 21s-7-4.5-9-9.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 5-9 9.5-9 9.5z';
    }
  }
}
