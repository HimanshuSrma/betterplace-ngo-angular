import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RevealDirective } from '../../directives/reveal.directive';
import { SplitTextDirective } from '../../directives/split-text.directive';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealDirective, SplitTextDirective, MagneticDirective],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private seo = inject(SeoService);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    number: ['', Validators.required],
    occupation: [''],
    amount: [''],
    message: ['']
  });
  sending = false;
  sent = false;
  error = '';

  ngOnInit() {
    this.seo.set({
      title: 'Contact — Betterplace',
      description: 'Reach out to volunteer, donate or partner with Betterplace.'
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending = true;
    this.error = '';
    this.http
      .post('https://formspree.io/f/myzwzpvj', this.form.value, {
        headers: { Accept: 'application/json' }
      })
      .subscribe({
        next: () => {
          this.sent = true;
          this.sending = false;
          this.form.reset();
        },
        error: () => {
          this.error = 'Could not send. Please email betterplacengo@gmail.com directly.';
          this.sending = false;
        }
      });
  }
}
