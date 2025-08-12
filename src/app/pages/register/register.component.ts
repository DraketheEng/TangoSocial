import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showPasswordConfirm = false;
  avatarPreview?: string | ArrayBuffer | null = null;
  submitting = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordComplexityValidator()]],
      confirmPassword: ['', Validators.required],
      gender: [''],
      birthDate: [''],
      city: [''],
      tangoLevel: [''],
      agree: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatchValidator() });
  }

  // Custom validators
private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const p = group.get('password')?.value;
      const c = group.get('confirmPassword')?.value;
      return p === c ? null : { passwordsMismatch: true };
    };
  }

private passwordComplexityValidator(): ValidatorFn {
    const re = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/; // en az 6, 1 büyük, 1 küçük, 1 rakam
    return (control: AbstractControl) => {
      if (!control.value) return null;
      return re.test(control.value) ? null : { weakPassword: true };
    };
  }

  // Password strength helper (0..4)
  passwordStrength(): number {
    const v = this.registerForm.get('password')?.value || '';
    let score = 0;
    if (v.length >= 6) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    return score;
  }

  strengthLabel(): { label: string, color: string } {
    const s = this.passwordStrength();
    if (s <= 1) return { label: 'Zayıf', color: 'bg-rose-500' };
    if (s === 2) return { label: 'Orta', color: 'bg-amber-500' };
    if (s === 3) return { label: 'İyi', color: 'bg-emerald-500' };
    return { label: 'Güçlü', color: 'bg-indigo-600' };
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
  togglePasswordConfirm(): void { this.showPasswordConfirm = !this.showPasswordConfirm; }

  onAvatarChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const f = input.files[0];
    const reader = new FileReader();
    reader.onload = () => { this.avatarPreview = reader.result; };
    reader.readAsDataURL(f);
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.submitting = true;

    // demo behaviour: kısa timeout sonra redirect to login
    await new Promise(res => setTimeout(res, 800));
    console.log('REGISTER (demo payload):', this.registerForm.value);
    this.submitting = false;

    // navigate to login or profile — demo
    this.router.navigate(['/giris']);
  }
}
