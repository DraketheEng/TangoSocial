import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Post {
  id: number;
  title: string;
  excerpt: string;
  imageUrl?: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  q = '';
  selectedCategory: string | null = null;
  selectedTags: Set<string> = new Set();
  newsletterEmail = '';
  newsletterMsg = '';
  pageSize = 6;
  page = 1;
  allLoaded = false;

  categories = ['Rehber', 'Teknik', 'Milonga', 'Ayakkabı', 'Performans'];
  tags = ['postür','ocho','caminata','milonga','ayakkabı','senaryo'];
  authors = [
    { name: 'Öyküm Çayır', title: 'Baş Eğitmen', avatar: 'https://i.pravatar.cc/100?img=47' },
    { name: 'Melis Tango', title: 'Eğitmen', avatar: 'https://i.pravatar.cc/100?img=12' },
    { name: 'Barış Yılmaz', title: 'Performans', avatar: 'https://i.pravatar.cc/100?img=23' }
  ];

  posts: Post[] = [
    {
      id: 1,
      title: 'Yeni Başlayanlar için Caminata: Basit ve Güçlü Adımlar',
      excerpt: 'Caminata’nın mantığını çöz; adımlar, ağırlık aktarımı ve partnerle iletişim için basit egzersizler.',
      imageUrl: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60',
      author: 'Öyküm Çayır',
      authorAvatar: 'https://i.pravatar.cc/100?img=47',
      category: 'Rehber',
      tags: ['caminata','postür'],
      date: '2025-07-20',
      readTime: '6 dk'
    },
    {
      id: 2,
      title: 'Milonga Adabı: Sosyal Sahada Hayatta Kalmak',
      excerpt: 'Milonga kültürünü bilmek, doğru müziğe uyum ve partner seçimleri hakkında pratik ipuçları.',
      // görsel yok -> text-only card
      author: 'Melis Tango',
      authorAvatar: 'https://i.pravatar.cc/100?img=12',
      category: 'Milonga',
      tags: ['milonga','etkilesim'],
      date: '2025-06-15',
      readTime: '4 dk'
    },
    {
      id: 3,
      title: 'Ayakkabı Seçimi: Denge ve Konfor Önemli',
      excerpt: 'Doğru taban, topuk yüksekliği ve kayma direnci nasıl seçilir — pratik rehber.',
      imageUrl: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=1200&q=60',
      author: 'Barış Yılmaz',
      authorAvatar: 'https://i.pravatar.cc/100?img=23',
      category: 'Ayakkabı',
      tags: ['ayakkabı'],
      date: '2025-05-10',
      readTime: '5 dk'
    },
    // daha fazla örnek (kopyalanmış minimal)
    {
      id: 4,
      title: 'Escenario İçin Performans Hazırlığı',
      excerpt: 'Sahne çalışmaları, izleyici yönetimi ve partnerle sahne koreografisi oluşturma.',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=60',
      author: 'Öyküm Çayır',
      authorAvatar: 'https://i.pravatar.cc/100?img=47',
      category: 'Performans',
      tags: ['senaryo','performans'],
      date: '2025-04-25',
      readTime: '7 dk'
    },
    {
      id: 5,
      title: 'Ocho Çalışmaları: Yön Değiştirmede Ustalık',
      excerpt: 'Ocho çeşitleri, teknik ipuçları ve partnerle koordinasyon örnekleri.',
      imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=60',
      author: 'Melis Tango',
      authorAvatar: 'https://i.pravatar.cc/100?img=12',
      category: 'Teknik',
      tags: ['ocho','teknik'],
      date: '2025-03-30',
      readTime: '6 dk'
    },
    {
      id: 6,
      title: 'Ritmin İçine Girmek: Müziksel İpucu',
      excerpt: 'Tango müziğinin yapısı, vuruşlar ve nasıl eş zamanlı dans edilir.',
      imageUrl: 'https://images.unsplash.com/photo-1520975914731-5f0a8d8c6b8f?auto=format&fit=crop&w=1200&q=60',
      author: 'Barış Yılmaz',
      authorAvatar: 'https://i.pravatar.cc/100?img=23',
      category: 'Teknik',
      tags: ['ritim','teknik'],
      date: '2025-02-12',
      readTime: '8 dk'
    }
  ];

  featured = [ ...this.posts.slice(0,3) ];
  popularPosts = this.posts.slice(0,3);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // başlangıç mantığı varsa ekle
    this.updatePaged();
  }

  // filtreleme
  applyFilters() {
    this.page = 1;
    this.allLoaded = false;
    this.updatePaged();
  }

  setCategory(cat: string) {
    this.selectedCategory = this.selectedCategory === cat ? null : cat;
    this.applyFilters();
  }

  toggleTag(tag: string) {
    if (this.selectedTags.has(tag)) this.selectedTags.delete(tag);
    else this.selectedTags.add(tag);
    this.applyFilters();
  }

  get filteredPosts(): Post[] {
    let list = [...this.posts];

    if (this.q && this.q.trim()) {
      const q = this.q.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.join(' ').toLowerCase().includes(q)
      );
    }

    if (this.selectedCategory) {
      list = list.filter(p => p.category === this.selectedCategory);
    }

    if (this.selectedTags.size) {
      list = list.filter(p => p.tags.some(t => this.selectedTags.has(t)));
    }

    return list;
  }

  // pagination / load more
  get pagedPosts(): Post[] {
    return this.filteredPosts.slice(0, this.pageSize * this.page);
  }

  updatePaged() {
    this.allLoaded = this.filteredPosts.length <= this.pageSize * this.page;
  }

  loadMore() {
    this.page++;
    this.updatePaged();
  }

  openPost(p: Post) {
    // örnek: /blog/ID
    this.router.navigate(['/blog', p.id]);
  }

  toggleBookmark(p: Post) {
    // dummy
    console.log('bookmark toggled', p.id);
  }

  followAuthor(a: any) {
    console.log('follow author', a.name);
  }

  subscribe() {
    if (!this.newsletterEmail || !this.newsletterEmail.includes('@')) {
      this.newsletterMsg = 'Geçerli bir e-posta gir.';
      return;
    }
    this.newsletterMsg = 'Teşekkürler — bültene eklendiniz (dummy).';
    this.newsletterEmail = '';
    setTimeout(()=> this.newsletterMsg = '', 3500);
  }
}
