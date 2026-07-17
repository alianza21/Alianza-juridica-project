import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-consulta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class ConsultaComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // Cambia esta URL por la de tu backend en producción si lo necesitas
  private readonly apiUrl = 'http://localhost:4000/api/consulta/consultas';

  loading = false;
  submitted = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,60}$/)]],
    documentId: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]],
    email: ['', [Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    problemDescription: ['', [Validators.required, Validators.minLength(10)]],
    town: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,40}$/)]],
    contactMethod: ['', [Validators.required]],
    privacyPolicy: [false, [Validators.requiredTrue]],
  });

  get f() {
    return this.form.controls;
  }

  isInvalid(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '')
      .slice(0, 60);

    this.form.controls.fullName.setValue(value, { emitEvent: false });
    input.value = value;
  }

  onTownInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '')
      .slice(0, 40);

    this.form.controls.town.setValue(value, { emitEvent: false });
    input.value = value;
  }

  onDocumentInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 10);

    this.form.controls.documentId.setValue(value, { emitEvent: false });
    input.value = value;
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 10);

    this.form.controls.phone.setValue(value, { emitEvent: false });
    input.value = value;
  }

  onSubmit(): void {
    this.submitted = true;
    this.message = '';
    this.messageType = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.http
      .post<any>(this.apiUrl, this.form.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.message = `Consulta registrada y correos enviados con éxito. Radicado: ${data?.Radicado ?? ''}`;
          this.messageType = 'success';

          this.form.reset({
            fullName: '',
            documentId: '',
            email: '',
            phone: '',
            problemDescription: '',
            town: '',
            contactMethod: '',
            privacyPolicy: false,
          });

          this.submitted = false;
        },
        error: (err) => {
          this.message = err?.error?.message || 'Error al enviar la consulta.';
          this.messageType = 'error';
        },
      });
  }
}