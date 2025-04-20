import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hacker-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hacker-contact.component.html',
  styleUrl: './hacker-contact.component.css'
})
export class HackerContactComponent {
  contactForm: FormGroup;
  showEncryptionError = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      alias: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const email: string = this.contactForm.get('email')?.value || '';

    if (!email.toLowerCase().includes('encrypt')) {
      this.showEncryptionError = true;
      return;
    }

    this.showEncryptionError = false;

    alert('📡 Packet sent to the darknet. Stay stealthy, agent.');
    this.contactForm.reset();
  }
}
