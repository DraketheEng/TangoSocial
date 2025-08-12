import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Instructor {
  id: number;
  name: string;
  title?: string;
  avatar: string;
  bio?: string;
  badge?: string;
}

interface EventItem {
  id: number;
  date: string;
  title: string;
  start: string;
  duration: string;
  place: string;
  capacity: string;
  seatsLeft: number;
}

interface Review {
  id: number;
  author: string;
  avatar: string;
  text: string;
  createdAt: string;
  rating: number;
}

interface Post {
  id: number;
  imageUrl?: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  city?: string;
}

@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.scss']
})
export class SchoolDetailComponent implements OnInit {
  schoolId!: number;
  following = false;
  showMessageModal = false;
  showBookingModal = false;
  bookingEvent?: EventItem | null = null;
  messageText = '';
  bookingName = '';
  bookingSeats = 1;

  school = {
    id: 11,
    name: 'Capital Tango',
    heroImage: 'https://scontent.fesb10-2.fna.fbcdn.net/v/t39.30808-6/305169702_496598735803269_4320544607253954484_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=YTzD4x7GY80Q7kNvwGfQbB2&_nc_oc=AdnTNyReB8LzLbZbLq24ZDI2vnLJd3IiPArq__saPv56rm5hpFJ2t_5Iiql2INNJ3Es&_nc_zt=23&_nc_ht=scontent.fesb10-2.fna&_nc_gid=_AVMCqnchPi0auV5jnj5dw&oh=00_AfUdF3qNZL7YlCRF9KNWMBI3YN8uHdr1-BM1azaIxDxfwQ&oe=689EE6F0',
    shortDesc: 'Ankara’nın performans & sosyal tango merkezi. Teknik atölyeler, sahne eğitimi ve haftalık milongalar.',
    longDesc: `Capital Tango, sahne ışıklarının gölgesinde doğan bir tutkunun hikâyesidir. Kurucusu Lord Furkan "JBluefire" Aydemir, 2002'de Gaziantep'te küçük bir atölye olarak başladığında aklında tek bir şey vardı: tangoyu hem teknik hem de ruh olarak öğretmek. Zamanla okula ilgi büyüdü; dansçılar sahneye hazırlandı, milongalar gecelere yayıldı ve Capital adı anılmaya başladı. Hikâyede azılı bir çekişme de var — Red Drake Can adlı rakip bir figür, BluFire sahnesine meydan okudu; rekabet sert ama sanat hep kazandı. Bu tatlı kargaşa, okulun karakterini sertleştirdi: daha disiplinli antrenmanlar, daha cesur performanslar, daha sıcak bir topluluk. Bugün Capital Tango, sadece bir stüdyo değil; Escenario teknikleri, sosyal milonga kültürü, bire bir koçluk ve yaratıcı atölyelerle dansçıların evrensel sahne dilini keşfettiği bir merkez. Yeni başlayanlardan profesyonellere, sahne tutkusu olan herkese açık — ama gerçek deneyim, sabır ve birkaç gece milonga sonrası gelir.`,
    address: 'Tunus Cd No:46 D:4, 06530 Çankaya/Ankara',
    email: 'info@capitaltango.com',
    phone: '+90 555 123 4567',
    rating: 4.9,
    ratingCount: 112,
    students: 420,
    instructors: 5,
    tags: ['escenario','milonga','workshop']
  };


  posts: Post[] = [
    {
      id: 301,
      imageUrl: 'https://source.unsplash.com/collection/190727/900x1200?sig=21',
      caption: 'Sahne provası sonrası kısa notlar — ritim kontrolü üzerine.',
      likesCount: 86,
      commentsCount: 12,
      createdAt: '2025-08-01T19:00:00Z',
      city: 'Ankara'
    },
    {
      id: 302,
      caption: 'Bugün milongada partner çalışma programı paylaştım. Kısa ipuçları burada.',
      likesCount: 42,
      commentsCount: 6,
      createdAt: '2025-07-28T21:00:00Z',
      city: 'Ankara'
    },
    {
      id: 303,
      imageUrl: 'https://source.unsplash.com/collection/190727/900x1200?sig=23',
      caption: 'Workshop fragmanı — teknik odağı: pivot ve frame.',
      likesCount: 120,
      commentsCount: 20,
      createdAt: '2025-07-18T18:00:00Z',
      city: 'Ankara'
    }
  ];

  instructors: Instructor[] = [
    { id: 1, name: 'Öyküm Çayır', title: 'Baş Eğitmen', avatar: 'https://i.pravatar.cc/120?img=47', badge: 'Şampiyon', bio: 'Escenario odaklı sahne teknikleri.' },
    { id: 2, name: 'Can Ağırbaş', title: 'Drake the King', avatar: 'https://i.pravatar.cc/120?img=23', badge: 'Kıskanılan adam', bio: 'Sahne ve partner koreografileri.' },
    { id: 3, name: 'Seda Demir', title: 'Teknik', avatar: 'https://i.pravatar.cc/120?img=34', badge: 'Milonga Uzmanı', bio: 'Salon stil ve milonga teknikleri.' },
  ];

  events: EventItem[] = [
    { id: 201, date: '2025-08-08', title: 'Escenario Teknikleri', start: '18:00', duration: '2 saat', place: 'Studio A', capacity: '8/12', seatsLeft: 4 },
    { id: 202, date: '2025-08-15', title: 'Milonga Pratiği', start: '20:00', duration: '3 saat', place: 'Milonga Lounge', capacity: '15/20', seatsLeft: 5 },
    { id: 203, date: '2025-08-22', title: 'Teknik Analiz Atölyesi', start: '17:00', duration: '1.5 saat', place: 'Studio B', capacity: '5/10', seatsLeft: 5 }
  ];

  gallery = [
    'https://images.unsplash.com/photo-1520975914731-5f0a8d8c6b8f?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=60',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=60'
  ];

  reviews: Review[] = [
    { id: 1, author: 'Merve Y.', avatar: 'https://randomuser.me/api/portraits/women/22.jpg', text: 'Teknik anlatım müthiş, sahnede özgüven kazandım.', createdAt: '2 hafta önce', rating: 5 },
    { id: 2, author: 'Burak T.', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', text: 'Milonga akşamları çok eğlenceli ve samimi.', createdAt: '1 ay önce', rating: 5 }
  ];

  protected readonly encodeURIComponent = encodeURIComponent;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      const id = Number(pm.get('id'));
      this.schoolId = id || this.school.id;
    });
  }

  /* ---------- Navigation / Post actions ---------- */

  openPost(postId: number) {
    // doğru param ile yönlendir
    this.router.navigate(['/gonderi-detay']);
  }

  // like action; post verildiğinde ilgili post'u arttırır.
  onLike(post?: Post) {
    if (!post) {
      // güvenli davranış: eğer param yok, sessizce dön
      return;
    }
    post.likesCount = (post.likesCount || 0) + 1;
  }

  loadMore() {
    // Basit dummy üretici: mevcut postları klonlayıp yeni id ver
    const nextIdBase = Date.now() % 100000;
    const clones: Post[] = this.posts.slice(0, 3).map((p, i) => ({
      ...p,
      id: nextIdBase + i + 1,
      createdAt: new Date().toISOString(),
      likesCount: Math.max(5, Math.floor(Math.random() * 150))
    }));
    this.posts = [...this.posts, ...clones];
  }

  /* ---------- Misc UI actions (dummy) ---------- */

  toggleFollow() {
    this.following = !this.following;
    console.log(this.following ? 'Takip edildi' : 'Takip bırakıldı');
  }

  openMessage() { this.showMessageModal = true; }
  closeMessage() { this.showMessageModal = false; this.messageText = ''; }
  sendMessage() {
    if (!this.messageText.trim()) return;
    console.log('Mesaj gönderildi (dummy):', this.messageText);
    this.closeMessage();
  }

  openBooking(ev?: Event, eventItem?: EventItem) {
    if (ev) ev.stopPropagation();
    this.bookingEvent = eventItem || null;
    this.showBookingModal = true;
  }
  closeBooking() {
    this.showBookingModal = false;
    this.bookingEvent = null;
    this.bookingName = '';
    this.bookingSeats = 1;
  }
  confirmBooking() {
    if (!this.bookingName.trim()) return;
    console.log('Rezervasyon (dummy):', { for: this.bookingEvent?.title, name: this.bookingName, seats: this.bookingSeats });
    this.closeBooking();
  }

  openGalleryImage(url: string) {
    // lightbox yerine yeni sekme
    window.open(url, '_blank');
  }

  // small helpers for dropdown/actions
  onSave(e?: Event, postId?: number) {
    if (e) e.stopPropagation();
    console.log('Kaydet (dummy):', postId);
  }

  report(postId?: number) {
    console.log('Rapor (dummy):', postId);
  }
  mute(postId?: number) {
    console.log('Sessize al (dummy):', postId);
  }
  bookmark(postId?: number) {
    console.log('İşaretle (dummy):', postId);
  }
}
