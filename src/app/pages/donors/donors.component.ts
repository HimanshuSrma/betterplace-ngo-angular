import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { SplitTextDirective } from '../../directives/split-text.directive';
import { SeoService } from '../../core/seo.service';

interface Member {
  name: string;
  photo: string;
  bio: string;
}

@Component({
  selector: 'app-donors',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, SplitTextDirective],
  templateUrl: './donors.component.html'
})
export class DonorsComponent implements OnInit {
  private seo = inject(SeoService);

  members: Member[] = [
    {
      name: 'Anirudh Atrish',
      photo: '/img/anirudh.png',
      bio: 'Visionary corporate leader with a passion for impact. Founder of Betterplace.'
    },
    {
      name: 'Shiv Kumar',
      photo: '/img/person/shiv.jpeg',
      bio: 'Exceptional government officer in the revenue department — a key member of our team.'
    },
    {
      name: 'Lokesh Atrri',
      photo: '/img/person/lokesh.jpeg',
      bio: 'Government officer with a passion for serving nature. One of our key donors and members.'
    },
    {
      name: 'Rajesh Kaushik',
      photo: '/img/person/rajesh.jpeg',
      bio: 'Politician and social worker in the health and medical industry. With us since 2020.'
    },
    {
      name: 'Chunish Minocha',
      photo: '/img/person/chunish.jpeg',
      bio: 'Senior manager at one of the top five banks in India. A strong, unparalleled support.'
    },
    {
      name: 'Anurag',
      photo: '/img/person/anurag.jpeg',
      bio: 'The youngest activist of our team — eager to participate in every event.'
    },
    {
      name: 'Dr Kuldeep',
      photo: '/img/person/kuldeep.jpeg',
      bio: 'Designated officer in the Indian Defence Forces. A regular guest at plantation drives.'
    },
    {
      name: 'Rakhi & Amit',
      photo: '/img/person/rakhi-amit.jpeg',
      bio: 'Super tech developers in Glasgow, UK. They never miss supporting our tree plantation events.'
    },
    {
      name: 'Versha & Gaurav',
      photo: '/img/person/versha-gaurav.jpeg',
      bio: 'Passionate about oxygen-generating plants — with TRIVENI being their favourite combo.'
    }
  ];

  ngOnInit() {
    this.seo.set({
      title: 'Donors & Members — Betterplace',
      description: 'The people who power Betterplace — donors, members, friends and family.'
    });
  }
}
