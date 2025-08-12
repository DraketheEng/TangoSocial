import { Component, OnInit } from '@angular/core';

type TabKey = 'liste' | 'takvim' | 'harita';
type EventType = 'milonga' | 'workshop' | 'pratik' | 'festival' | 'other';
type Level = 'all' | 'beginner' | 'intermediate' | 'advanced';

interface EventItem {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  full?: boolean;
  level?: Level;
  bookmarked?: boolean;
  popular?: boolean;
  lastSeats?: boolean;
  past?: boolean;
  dj?: string[];
  instructors?: string[];
  school?: string;
  organizer?: string;
  featured: boolean;
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  // UI state
  activeTab: TabKey = 'liste';

  // Basit filtre modeli
  filters = {
    q: '',
    type: 'all' as EventType | 'all',
    date: '' as string | null,
    level: 'all' as Level
  };

  events: EventItem[] = [];

  get featuredEvent(): EventItem | undefined {
    return this.filteredEvents.find(e => e.featured);
  }

  get nonFeaturedEvents(): EventItem[] {
    return this.filteredEvents.filter(e => !e.featured);
  }

  get filteredEvents(): EventItem[] {
    return this.events.filter(e => {
      // type
      if (this.filters.type !== 'all' && e.type !== this.filters.type) return false;

      // level
      if (this.filters.level !== 'all' && e.level && e.level !== this.filters.level) return false;

      // date
      if (this.filters.date) {
        const fDate = new Date(this.filters.date).toDateString();
        if (new Date(e.date).toDateString() !== fDate) return false;
      }

      // search q
      const q = this.filters.q.trim().toLowerCase();
      if (q) {
        const haystack = `${e.title} ${e.venue} ${e.city}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }

  // Takvim state
  currentMonth = new Date();
  calendarDays: Date[] = [];

  ngOnInit(): void {
    // Mock data — replace with API call
    this.events = this.mockEvents();
    this.buildCalendar(this.currentMonth);
  }

  // Tab kontrolü
  setActiveTab(tab: TabKey) {
    this.activeTab = tab;
  }

  // Filtre yardımcıları
  setType(t: EventType | 'all') {
    this.filters.type = t as any;
  }

  setLevel(l: Level) {
    this.filters.level = l;
  }

  applyFilters() {
    // Eğer backend filtreleme kullanacaksan buradan service çağır
    // Şimdilik UI tarafında computed filteredEvents kullanılıyor
    // Küçük UX: listeye dön
    this.setActiveTab('liste');
  }

  toggleBookmark(e: EventItem) {
    e.bookmarked = !e.bookmarked;
  }

  // Takvim: basit ay değişimi ve 42 hücre üretimi (6x7)
  buildCalendar(base: Date) {
    const year = base.getFullYear();
    const month = base.getMonth();
    const first = new Date(year, month, 1);
    const startDay = (first.getDay() + 6) % 7; // Pazartesi başlatmak için (Pzt=0)
    const startDate = new Date(year, month, 1 - startDay);

    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      days.push(d);
    }
    this.calendarDays = days;
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.buildCalendar(this.currentMonth);
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.buildCalendar(this.currentMonth);
  }

  dayHasEvents(d: Date): boolean {
    return this.events.some(e => new Date(e.date).toDateString() === d.toDateString());
  }

  eventsOnDay(d: Date): EventItem[] {
    return this.events.filter(e => new Date(e.date).toDateString() === d.toDateString());
  }

  badgeForType(type: EventType) {
    switch (type) {
      case 'milonga': return 'badge-secondary badge-xs';
      case 'workshop': return 'badge-success badge-xs';
      case 'pratik': return 'badge-accent badge-xs';
      case 'festival': return 'badge-info badge-xs';
      default: return 'badge-ghost badge-xs';
    }
  }

  focusMapOn(e: EventItem) {
    console.log('Focus map on', e);
  }

  private mockEvents(): EventItem[] {
    return [
      {
        id: '1',
        title: 'Milonga La Noche',
        type: 'milonga',
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 16).toISOString(),
        time: '21:00 - 02:00',
        venue: 'Tango Mío',
        city: 'Ankara',
        image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&w=800&q=80',
        full: false,
        level: 'all',
        popular: true,
        dj: ['DJ Carlos', 'DJ Lucia'],
        past: false,
        featured: false
      },
      {
        id: '2',
        title: 'Ganchos & Boleos',
        type: 'workshop',
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 23).toISOString(),
        time: '14:00 - 16:00',
        venue: 'Studio B',
        city: 'İstanbul',
        image: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=800&q=80',
        full: false,
        level: 'all',
        lastSeats: true,
        instructors: ['Juan Perez', 'Ana Gomez'],
        past: false,
        featured: false
      },
      {
        id: '3',
        title: 'Çarşamba Practica',
        type: 'pratik',
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 6).toISOString(),
        time: '20:00 - 22:00',
        venue: 'Tango Evita',
        city: 'İzmir',
        image: 'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=800&q=80',
        full: false,
        level: 'all',
        school: 'SHINE',
        past: true,
        featured: false
      },
      {
        id: '4',
        title: 'Noche de Pasión',
        type: 'milonga',
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 19).toISOString(),
        time: '21:30 - 02:30',
        venue: 'La Boca',
        city: 'İstanbul',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        full: true,
        level: 'all',
        dj: ['DJ Martin'],
        past: false,
        featured: false
      },
      {
        id: '5',
        title: 'Milonga Sueno Bosco',
        type: 'milonga',
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 22).toISOString(),
        time: '21:30 - 02:30',
        venue: 'Bosco Cafe',
        city: 'Ankara',
        image: 'https://cdn.pixabay.com/photo/2021/07/17/22/27/dancing-6474213_1280.jpg',
        full: false,
        level: 'all',
        dj: ['DJ Sofia'],
        past: false,
        featured: false
      },
      {
        id: '6',
        title: 'CSO Kovan Bistronomy',
        type: 'milonga',
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 28).toISOString(),
        time: '21:00 - 04:00',
        venue: 'CSO Kovan Bistronomy',
        city: 'Ankara',
        image: 'https://cdn.pixabay.com/photo/2024/02/16/23/07/ai-generated-8578494_1280.jpg',
        full: true,
        level: 'all',
        dj: ['DJ Alex'],
        past: false,
        featured: false
      },
      {
        id: '7',
        title: 'Ankara Uluslararası Tango Festivali',
        type: 'festival',
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 25).toISOString(),
        time: 'Tüm Gün',
        venue: 'Congresium',
        city: 'Ankara',
        image: 'https://media.istockphoto.com/id/2048162222/tr/foto%C4%9Fraf/elegant-young-woman-and-handsome-man-ballroom-dancers-in-motion-dancing-against-gradient.jpg?s=1024x1024&w=is&k=20&c=0yW8Vi_nBi_IOlFbWwCluRwktZd5le4xQyPuBPbJ79Y=',
        full: false,
        level: 'all',
        organizer: 'Ankara Capital Tango',
        past: false,
        featured: true
      }
    ];
  }


}
