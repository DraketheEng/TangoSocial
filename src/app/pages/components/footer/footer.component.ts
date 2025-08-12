import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  newsletterEmail = '';
  subscribing = false;
  currentYear = new Date().getFullYear();

  constructor(private router: Router) {}

  goTo(path: string) {
    // küçük navigation yardımcı
    this.router.navigateByUrl(path);
  }

  subscribe() {
    if (!this.newsletterEmail) return;
    this.subscribing = true;
    setTimeout(() => {
      this.subscribing = false;
      this.newsletterEmail = '';
      alert('Teşekkürler — bültene kaydoldun (dummy).');
    }, 900);
  }

}
