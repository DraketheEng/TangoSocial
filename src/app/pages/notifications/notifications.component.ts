import { Component, OnInit } from '@angular/core';

type NotificationType = 'message' | 'match' | 'event' | 'badge' | 'system';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  muted?: boolean;
  targetUrl?: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  // UI state
  filter: 'all' | 'unread' | NotificationType = 'all';
  q = '';
  pageSize = 12;
  showAll = false;

  constructor() {}

  ngOnInit(): void {
    // seed with dummy data (mix of with/without read, different types)
    this.notifications = [
      {
        id: 1,
        type: 'message',
        title: 'Yeni mesaj: Öyküm Çayır',
        description: 'Öyküm: Haftasonu teknik atölyesi için kayıt açıldı, katılmak ister misin?',
        createdAt: this.isoOffset(-20, 'minutes'),
        read: false,
        targetUrl: '/mesajlar/oykum'
      },
      {
        id: 2,
        type: 'event',
        title: 'Escenario Teknikleri — Kontenjan azaldı',
        description: '8 Ağustos etkinliği 2 koltuk kaldı. Hızlı davran.',
        createdAt: this.isoOffset(-2, 'hours'),
        read: false,
        targetUrl: '/etkinlik/201'
      },
      {
        id: 3,
        type: 'match',
        title: 'Yeni eşleşme: Maria',
        description: 'Maria ile yeni bir eşleşme var — iletişim kur!',
        createdAt: this.isoOffset(-1, 'days'),
        read: true,
        targetUrl: '/profiller/maria'
      },
      {
        id: 4,
        type: 'badge',
        title: 'Rozet kazandın: Escenario Pro',
        description: 'Tebrikler — Escenario Pro rozeti cüzdanına eklendi.',
        createdAt: this.isoOffset(-5, 'days'),
        read: true
      },
      {
        id: 5,
        type: 'system',
        title: 'Güvenlik: yeni cihazla giriş',
        description: 'Hesabına yeni bir cihazdan giriş yapıldı: Chrome — macOS.',
        createdAt: this.isoOffset(-7, 'days'),
        read: false
      },
      // more dummies for pagination
      ...Array.from({ length: 6 }).map((_, i) => ({
        id: 10 + i,
        type: (['message','event','match','badge','system'] as NotificationType[])[i % 5],
        title: `Sistem bildirimi #${i + 1}`,
        description: `Bu test bildirimi örneğidir. #${i + 1}`,
        createdAt: this.isoOffset(- (i + 10), 'hours'),
        read: Math.random() > 0.6
      }))
    ];
  }

  /* ---------------- Utility ---------------- */
  isoOffset(amount: number, unit: 'minutes' | 'hours' | 'days') {
    const d = new Date();
    if (unit === 'minutes') d.setMinutes(d.getMinutes() + amount);
    if (unit === 'hours') d.setHours(d.getHours() + amount);
    if (unit === 'days') d.setDate(d.getDate() + amount);
    return d.toISOString();
  }

  timeAgo(iso: string): string {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = Math.max(0, Math.floor((now - then) / 1000)); // seconds
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff/60)}m`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h`;
    return `${Math.floor(diff/86400)}d`;
  }

  /* ---------------- Filters & search ---------------- */
  setFilter(f: 'all' | 'unread' | NotificationType) {
    this.filter = f;
  }

  get filteredNotifications(): Notification[] {
    let items = this.notifications.slice().sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (this.filter === 'unread') items = items.filter(x => !x.read);
    else if (this.filter !== 'all') items = items.filter(x => x.type === this.filter);

    if (this.q && this.q.trim().length > 0) {
      const q = this.q.toLowerCase();
      items = items.filter(n => (n.title + ' ' + n.description).toLowerCase().includes(q));
    }

    if (!this.showAll) {
      return items.slice(0, this.pageSize);
    }
    return items;
  }

  /* ---------------- Actions ---------------- */
  toggleRead(n: Notification) {
    n.read = !n.read;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  markAllAsUnread() {
    this.notifications.forEach(n => n.read = false);
  }

  mute(n: Notification) {
    n.muted = !n.muted;
  }

  clearRead() {
    this.notifications = this.notifications.filter(n => !n.read);
  }

  remove(n: Notification) {
    const idx = this.notifications.findIndex(x => x.id === n.id);
    if (idx >= 0) this.notifications.splice(idx,1);
  }

  openTarget(n: Notification) {
    if (n.targetUrl) {
      // navigate in app — replace with Router if available
      window.location.href = n.targetUrl;
    } else {
      console.log('No target for notification', n.id);
    }
  }

  loadAll() {
    this.showAll = true;
  }
}
