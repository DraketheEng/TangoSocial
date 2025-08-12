import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Section {
  type: 'h2' | 'p' | 'quote' | 'img' | 'ol' | 'ul';
  text?: string;
  author?: string;
  src?: string;
  caption?: string;
  items?: string[];
}

interface Article {
  id: number;
  title: string;
  subtitle?: string;
  coverImage?: string;
  readingTime?: string;
  tags: string[];
  author: { name: string; avatar: string; bio?: string; profileSlug?: string };
  publishedAt: string;
  sections: Section[];
  likes: number;
  commentsCount: number;
  slug?: string;
}

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  text: string;
  createdAt: string;
  likes?: number;
}

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  article!: Article;
  related: Article[] = [];
  comments: Comment[] = [];
  newComment = '';
  bookmarking = false;
  liked = false;

  constructor(public router: Router) {}

  galleryImages: { src: string }[] = [];

  ngOnInit(): void {


    if (this.article?.sections) {
      this.galleryImages = this.article.sections
        .filter((x: any) => x.type === 'img')
        .map((x: any) => ({ src: x.src }));
    }

    this.article = {
      id: 501,
      title: 'Caminata’dan Ocho’ya: Yeni Başlayanlar İçin Tango Yolculuğu',
      subtitle:
        'Basitten karmaşığa: ilk adımlardan partner iletişimine, milonga adabından sahne güvenine kadar kapsamlı rehber.',
      coverImage:
        'https://images.unsplash.com/photo-1534367618214-0bcb9d2b5f01?auto=format&fit=crop&w=1600&q=60',
      readingTime: '8 dk',
      tags: ['caminata', 'abrazo', 'milonga', 'başlangıç'],
      author: {
        name: 'Öyküm Çayır',
        avatar: 'https://i.pravatar.cc/120?img=47',
        bio: 'Escenario eğitmeni — performans, teknik, sahne deneyimi.',
        profileSlug: 'oykum-cayir',
      },
      publishedAt: '2025-07-12T10:30:00Z',
      likes: 348,
      commentsCount: 14,
      sections: [
        { type: 'p', text: 'Tango öğrenmek, hızla bir teknik birikimi değil; aynı zamanda bir topluluğa ve bir iletişim biçimine giriştir. Bu makalede adım adım ilerleyip yeni başlayanların en sık yaptığı hatalardan nasıl kaçınacaklarını göreceğiz.' },
        { type: 'h2', text: '1. Caminata: Temel yürüyüşün önemi' },
        { type: 'p', text: 'Caminata, tango yürüyüşüdür — dümdüz ama içi dolu. Ayak yerleştirme, ağırlık aktarımı ve denge burada her şey demektir.' },
        { type: 'ol', items: [
            'Adım uzunluğunu sabit tut: ne çok kısa ne çok uzun.',
            'Ağırlığı tamamen diğer ayağa aktarmadan ileri adım atma.',
            'Gözler yere değil, hafif yukarıda — çevreyi takip edin.'
          ]
        },
        { type: 'img', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=60', caption: 'Caminata pratiği: adım & denge.' },
        { type: 'h2', text: '2. Abrazo: Konforlu bir bağlantı kurmak' },
        { type: 'p', text: 'Abrazo iki kişinin birbirine verdiği fiziksel ve duygusal alanın dengesi. Çok sıkı ya da çok gevşek olmamalı — nefes aldırmalı.' },
        { type: 'quote', text: 'İyi bir abrazo, ritmin sessiz bir anlaşmasıdır.', author: 'Öyküm Çayır' },
        { type: 'p', text: 'Açık ve kapalı abrazo arasındaki farkları küçük egzersizlerle deneyin: ayakta dururken partnerinize 3-4 saniyede nasıl yakınlaştığınızı hissedin.' },
        { type: 'h2', text: '3. Milonga adabı ve sosyal kurallar' },
        { type: 'p', text: 'Milonga, sahne değildir; ortak bir yolculuktur. Kısa teşekkür, sıra kurallarına saygı ve partnerin sınırına dikkat etmeniz yeterlidir.' },
        { type: 'ul', items: ['Göz teması ile nazik davet', 'Müzik bittiğinde teşekkür', 'Sıraya uyum göster'] },
        { type: 'img', src: 'https://images.unsplash.com/photo-1520975914731-5f0a8d8c6b8f?auto=format&fit=crop&w=1200&q=60', caption: 'Milonga gecesinden bir kare.' },
        { type: 'h2', text: '4. Müzikle dans etmek: ritim ve vurgu' },
        { type: 'p', text: 'Tango müziği vurgu ve nefes ile doludur. Basit bir şarkıda bir tekrar dinleyip “1-2-3, 1-2” vurguya odaklanmak başlangıç için yeterli.' },
        { type: 'h2', text: '5. Kısa çalışma planı (İlk 4 hafta)' },
        { type: 'ul', items: ['Hafta 1: Caminata & duruş', 'Hafta 2: Abrazo & basit dönüşler', 'Hafta 3: Ocho girişleri', 'Hafta 4: Milonga pratikleri ve sosyal kurallar'] },
        { type: 'p', text: 'Kapanış olarak: sabır, merak ve sürekli pratik. Tango yarışması kazanmak için değil, ritmi hissetmek için öğrenilir.' }
      ]
    };

    // related articles (dummy)
    this.related = [
      {
        id: 502,
        title: 'Abrazo Pratiği: 5 Egzersiz',
        coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=60',
        readingTime: '3 dk',
        tags: ['abrazo'],
        author: { name: 'Seda Demir', avatar: 'https://i.pravatar.cc/100?img=34' },
        publishedAt: '2025-06-20',
        sections: [{ type: 'p', text: 'Kısa egzersizler...' }],
        likes: 82,
        commentsCount: 6
      } as Article,
      {
        id: 503,
        title: 'Ocho: Döndürme teknikleri',
        coverImage: 'https://images.unsplash.com/photo-1534367618214-0bcb9d2b5f01?auto=format&fit=crop&w=1200&q=60',
        readingTime: '6 dk',
        tags: ['ocho'],
        author: { name: 'Barış Yılmaz', avatar: 'https://i.pravatar.cc/100?img=23' },
        publishedAt: '2025-05-10',
        sections: [{ type: 'p', text: 'Pivot çalışmaları...' }],
        likes: 144,
        commentsCount: 11
      } as Article
    ];

    // comments
    this.comments = [
      { id: 1, author: 'Merve Y.', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', text: 'Çok açıklayıcı, teşekkürler!', createdAt: '2 gün önce', likes: 3 },
      { id: 2, author: 'Burak T.', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', text: 'Abrazo kısmı mükemmeldi, denedim işe yaradı.', createdAt: '1 hafta önce', likes: 5 }
    ];
  }

  formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString();
  }

  openAuthorProfile() {
    if (this.article.author.profileSlug) {
      this.router.navigate(['/profil', this.article.author.profileSlug]);
    }
  }

  openImage(url: string) {
    window.open(url, '_blank');
  }

  toggleBookmark() {
    this.bookmarking = !this.bookmarking;
  }

  toggleLike() {
    this.liked = !this.liked;
    this.article.likes += this.liked ? 1 : -1;
  }

  share(channel: 'twitter' | 'facebook' | 'whatsapp' | 'copy') {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.article.title);
    if (channel === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else if (channel === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (channel === 'whatsapp') {
      window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link kopyalandı');
    }
  }

  submitComment() {
    const text = this.newComment.trim();
    if (!text) return;
    const id = Date.now();
    this.comments.unshift({
      id,
      author: 'Sen (demo)',
      avatar: 'https://i.pravatar.cc/60',
      text,
      createdAt: 'şimdi',
      likes: 0
    });
    this.newComment = '';
    // increase comment count
    this.article.commentsCount = (this.article.commentsCount || 0) + 1;
  }

  readTimeToLabel() {
    return this.article.readingTime || '—';
  }
}
