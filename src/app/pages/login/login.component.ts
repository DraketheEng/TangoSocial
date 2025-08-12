import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  model = {
    email: '',
    password: '',
    remember: true
  };

  showPassword = false;
  submitting = false;
  errorMsg = '';

  constructor(private router: Router) {
    // eğer localStorage'da kayıtlıysa doldur
    const saved = localStorage.getItem('ts_login_remember');
    if (saved) {
      try {
        const s = JSON.parse(saved);
        this.model.email = s.email || '';
        this.model.remember = !!s.remember;
      } catch { /* ignore */ }
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async login(form: NgForm) {
    this.errorMsg = '';
    if (!form.valid) {
      this.errorMsg = 'Lütfen formu eksiksiz ve doğru doldur.';
      return;
    }

    this.submitting = true;

    // demo: basit client-side "login" simülasyonu
    await new Promise(r => setTimeout(r, 700));

    // very light credential check (demo only)
    if (this.model.email.toLowerCase() === 'drake@example.com' && this.model.password === 'password') {
      // remember?
      if (this.model.remember) {
        localStorage.setItem('ts_login_remember', JSON.stringify({ email: this.model.email, remember: true }));
      } else {
        localStorage.removeItem('ts_login_remember');
      }

      // başarılı -> yönlendir
      this.router.navigate(['/']);
    } else {
      this.errorMsg = 'E-posta veya şifre hatalı. Demo hesabı: drake@example.com / password';
    }

    this.submitting = false;
  }

  // Sosyal giriş butonları demo
  socialLogin(provider: 'google' | 'facebook' | 'apple') {
    // gerçek dünyada OAuth flow başlatılır
    alert(`${provider} ile giriş (demo).`);
  }

}
