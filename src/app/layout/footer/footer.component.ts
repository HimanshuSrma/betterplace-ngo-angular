import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { SplitTextDirective } from '../../directives/split-text.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, SplitTextDirective],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  year = new Date().getFullYear();
  links = [
    { label: 'Home', path: '/' },
    { label: 'Donors', path: '/donors' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Stories', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];
  causes = ['Nature Conservation', 'Animal Welfare', 'Clean Energy', 'Human Upliftment'];
}
