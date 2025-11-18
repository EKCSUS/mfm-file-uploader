import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" placeholder="Email" type="email" />
      <input formControlName="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.getRawValue()).subscribe();
  }
}
