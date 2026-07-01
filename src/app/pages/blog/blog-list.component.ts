import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { SplitTextDirective } from '../../directives/split-text.directive';
import { BlogService } from '../../core/blog.service';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RevealDirective, SplitTextDirective],
  // RevealDirective + SplitTextDirective applied via host attrs in template
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {
  blog = inject(BlogService);
  private seo = inject(SeoService);
  query = '';

  filtered() {
    const q = this.query.toLowerCase().trim();
    if (!q) return this.blog.posts();
    return this.blog.posts().filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.join(' ').toLowerCase().includes(q)
    );
  }

  ngOnInit() {
    this.seo.set({
      title: 'Stories from the field - Betterplace',
      description: 'Stories, reflections and field notes from the Betterplace team.'
    });
  }
}
