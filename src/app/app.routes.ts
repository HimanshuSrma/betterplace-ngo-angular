import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { title: 'Betterplace — A Better Place For All' }
  },
  {
    path: 'donors',
    loadComponent: () => import('./pages/donors/donors.component').then((m) => m.DonorsComponent),
    data: { title: 'Donors & Members — Betterplace' }
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
    data: { title: 'Gallery — Betterplace' }
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-list.component').then((m) => m.BlogListComponent),
    data: { title: 'Stories from the field — Betterplace' }
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-single.component').then((m) => m.BlogSingleComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    data: { title: 'Contact — Betterplace' }
  },
  { path: '**', redirectTo: '' }
];
