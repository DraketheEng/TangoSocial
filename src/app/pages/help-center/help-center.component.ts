import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl?: string;
  category: string;
  readTime: string;
  author: string;
  authorAvatar: string;
  date: string;
  updatedAt?: string;
  slug?: string;
}

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss']
})
export class HelpCenterComponent implements OnInit {
  q = '';
  page = 1;
  pageSize = 8;
  allLoaded = false;

  // tango odaklı kategoriler
  categories = ['Genel', 'Teknik', 'Etiket', 'Müzik', 'Donanım', 'Diğer'];
  selectedCategory: string | null = null;

  announcement = {
    title: '',
    body: ''
  };

  featured: Article[] = [];
  articles: Article[] = [];
  faqs: { q: string; a: string }[] = [];

  showTicket = false;
  ticket = { subject: '', category: '', body: '' };
  ticketMsg = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Announcement (tango odaklı)
    this.announcement = {
      title: 'Yeni Ücretsiz Başlangıç Atölyesi',
      body:
        'Her ay ilk hafta Pazar günü yapılan "Tango Başlangıç Atölyesi" ücretsizdir — kayıt için kontenjan sınırlı, hemen başvur.'
    };

    // Featured (örnek)
    this.featured = [
      {
        id: 101,
        title: 'İlk Adım: Caminata — Temel Yürüyüşü Hakiki Öğren',
        excerpt:
          'Caminata’nın (temel yürüyüş) incelikleri: adım uzunluğu, ağırlık aktarımı ve ortak ritim hissi.',
        imageUrl:
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=60',
        category: 'Teknik',
        readTime: '5 dk',
        author: 'Öyküm Çayır',
        authorAvatar: 'https://i.pravatar.cc/100?img=47',
        date: '2025-07-08',
        slug: 'caminata-temelleri'
      },
      {
        id: 102,
        title: 'Abrazo: Güvence ve Rahatlık Arasındaki Denge',
        excerpt:
          'Partnerle kurulan ideal abrazo nasıl olur? Açık/kapalı kucaklama, nefes ve gövde hattı üzerine pratikler.',
        imageUrl: '',
        category: 'Stil',
        readTime: '4 dk',
        author: 'Seda Demir',
        authorAvatar: 'https://i.pravatar.cc/100?img=34',
        date: '2025-06-20',
        slug: 'abrazo-dengesi'
      },
      {
        id: 103,
        title: 'Milonga Etiketi: Sosyal Dansta Doğru Davranış',
        excerpt:
          'Müzik, sıra, partner çağırma ve sosyal kurallar — milongada saygı nasıl gösterilir?',
        imageUrl:
          'https://images.unsplash.com/photo-1520975914731-5f0a8d8c6b8f?auto=format&fit=crop&w=1200&q=60',
        category: 'Etiket',
        readTime: '3 dk',
        author: 'Topluluk Ekibi',
        authorAvatar: 'https://i.pravatar.cc/100?img=12',
        date: '2025-05-30',
        slug: 'milonga-etiketi'
      }
    ];

    // Articles (örnek liste)
    this.articles = [
      {
        id: 201,
        title: 'Temel Durus (Postür) — Güç ve Esneklik',
        excerpt:
          'Doğru postür; denge, takip ve liderlik-takip arasındaki netliği sağlar. Basit egzersizlerle hemen düzelt.',
        imageUrl: '',
        category: 'Teknik',
        readTime: '4 dk',
        author: 'Barış Yılmaz',
        authorAvatar: 'https://i.pravatar.cc/100?img=23',
        date: '2025-04-12',
        slug: 'postur-egitimi'
      },
      {
        id: 202,
        title: 'Ocho’ların Anatomisi — Temel Döndürmeler',
        excerpt:
          'Ocho atarken ağırlık merkezi, pivot ve partnerin yönlendirilmesi nasıl yapılır — adım adım.',
        imageUrl: '',
        category: 'Teknik',
        readTime: '6 dk',
        author: 'Öyküm Çayır',
        authorAvatar: 'https://i.pravatar.cc/100?img=47',
        date: '2025-03-28',
        slug: 'ocho-anatomi'
      },
      {
        id: 203,
        title: 'Müzik Okuma: Tango Ritmini Hissetmek',
        excerpt:
          'Tango müziğinin yapısı, ölçü ve vurgu noktaları — dansını müzikle uyumlandır.',
        imageUrl:
          'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=60',
        category: 'Müzik',
        readTime: '5 dk',
        author: 'DJ Milonga',
        authorAvatar: 'https://i.pravatar.cc/100?img=15',
        date: '2025-02-10',
        slug: 'tango-muzigi-okuma'
      },
      {
        id: 204,
        title: 'Partner İletişimi: Küçük İşaretler, Büyük Fark',
        excerpt:
          'Göğüs, omuz ve adım tempolarıyla nasıl net ama nazik iletiler gönderilir.',
        imageUrl: '',
        category: 'Stil',
        readTime: '4 dk',
        author: 'Seda Demir',
        authorAvatar: 'https://i.pravatar.cc/100?img=34',
        date: '2025-01-05',
        slug: 'partner-iletisim'
      },
      {
        id: 205,
        title: 'Ayakkabı Rehberi: Kayma, Kavrama ve Konfor Dengesi',
        excerpt: 'Hangi taban, topuk yüksekliği ve malzeme yeni başlayanlar için uygundur?',
        imageUrl: '',
        category: 'Donanım',
        readTime: '3 dk',
        author: 'Donanım Ekibi',
        authorAvatar: 'https://i.pravatar.cc/100?img=9',
        date: '2024-12-18',
        slug: 'ayakkabi-rehberi'
      }
    ];

    // SSS
    this.faqs = [
      {
        q: 'Yeni başlıyorum — partnerim yok, katılabilir miyim?',
        a:
          'Kesinlikle. Birçok stüdyo ve milonga partner eşleştirmesi yapar; ayrıca tek başına gelip pratiğe katılabilirsiniz.'
      },
      {
        q: 'İlk derste ne giymeliyim?',
        a:
          'Rahat ama şık: esnek pantolon veya etek, destekli ayakkabı; stiletto veya büyük topuklar başlangıç için önerilmez.'
      },
      {
        q: 'Milonga adabı nedir?',
        a:
          'Göz temasıyla dans isteği göstermek, sıraya saygı, kısa teşekkürler ve partnerin konforunu gözetmek ana kurallardır.'
      },
      {
        q: 'Hangi müzikler tango sayılır?',
        a:
          'Klasik tango (Astor Piazzolla, Carlos Gardel), vals ve milonga alt türleri; DJ setlerinde bu üç tür karışır.'
      },
      {
        q: 'Pratik için günde ne kadar zaman ayırmalıyım?',
        a:
          'Yeni başlarken haftada 2–3 seans (her biri 45–60 dk) ve ekstra kısa bireysel yürüyüş pratiği çok etkili olur.'
      }
    ];

    // initial UI state
    this.featured = this.featured.concat(); // already set, safe
    this.updatePaged();
  }

  // Arama hızlı arama - template çağırır
  quickSearch(term: string) {
    this.q = term || '';
    this.applyFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  applyFilters() {
    this.page = 1;
    this.allLoaded = false;
    this.updatePaged();
  }

  toggleCategory(c: string) {
    this.selectedCategory = this.selectedCategory === c ? null : c;
    this.applyFilters();
  }

  get filteredArticles(): Article[] {
    let list = [...this.articles];
    if (this.q && this.q.trim()) {
      const q = this.q.toLowerCase();
      list = list.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }
    if (this.selectedCategory) {
      list = list.filter(a => a.category === this.selectedCategory);
    }
    return list;
  }

  get filteredArticlesSlice(): Article[] {
    return this.filteredArticles.slice(0, this.pageSize * this.page);
  }

  loadMore() {
    if (this.allLoaded) return;
    this.page++;
    this.updatePaged();
  }

  updatePaged() {
    this.allLoaded = this.filteredArticles.length <= this.pageSize * this.page;
  }

  openArticle(idOrArticle: number | Article) {
    const id = typeof idOrArticle === 'number' ? idOrArticle : idOrArticle.id;
    this.router.navigate(['/help', 'article', id]);
  }

  openArticleBySlug(slug: string) {
    const found = this.articles.find(a => a.slug === slug);
    if (found) {
      this.openArticle(found.id);
    } else {
      console.warn('Makale bulunamadı:', slug);
    }
  }

  openTicketForm() {
    this.showTicket = true;
    this.ticket = { subject: '', category: this.categories[0], body: '' };
    this.ticketMsg = '';
  }

  closeTicket() {
    this.showTicket = false;
    this.ticketMsg = '';
  }

  submitTicket() {
    if (!this.ticket.subject.trim() || !this.ticket.body.trim()) {
      this.ticketMsg = 'Lütfen konu ve açıklamayı doldurun.';
      return;
    }
    console.log('Yeni destek talebi:', this.ticket);
    this.ticketMsg = 'Talebin alındı. Destek ekibi yakında yanıt verecek (dummy).';
    setTimeout(() => {
      this.closeTicket();
    }, 1600);
  }

  // alias to present in template with paging
  get displayedArticles(): Article[] {
    return this.filteredArticles.slice(0, this.pageSize * this.page);
  }

  // small helper
  get allLoadedFlag(): boolean {
    return this.filteredArticles.length <= this.pageSize * this.page;
  }
}
