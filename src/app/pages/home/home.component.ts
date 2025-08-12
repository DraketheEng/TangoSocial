import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  openDropdownForPostId: string | null = null;
  showToast = false;
  toastText = '';
  private toastTimer: any;

  filterDropdownOpen = false;

  toggleFilterDropdown(e: MouseEvent) {
    e.stopPropagation();
    this.filterDropdownOpen = !this.filterDropdownOpen;
  }

  applyFilter(filterKey: string) {
    this.filterDropdownOpen = false;

    switch (filterKey) {
      case 'newest':
        this.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.toast('En yeniye göre sıralandı');
        break;
      case 'popular':
        this.posts.sort((a, b) => b.likesCount - a.likesCount);
        this.toast('Popüler paylaşımlar gösteriliyor');
        break;
      case 'following':
        this.posts = this.posts.filter(p => ['Melis Tango', 'Sibel Tango'].includes(p.author));
        this.toast('Takip edilenlerin paylaşımları gösteriliyor');
        break;
      case 'clear':
      default:
        // Orijinal postları tekrar yükle ya da filtreyi temizle
        this.toast('Filtre temizlendi');
        this.posts = this.originalPosts;
        break;
    }
  }



  @ViewChild('commentInput', { read: ElementRef, static: false }) commentInput?: ElementRef;

  toggleMore(e: MouseEvent, postId: string) {
    e.stopPropagation();
    if (this.openDropdownForPostId === postId) {
      this.openDropdownForPostId = null;
    } else {
      this.openDropdownForPostId = postId;
    }
  }

  onSave(e?: MouseEvent) {
    if (e) e.stopPropagation();
    this.toast('Kaydedildi');
    // burada backend'e kaydet çağrısı yapabilirsin, postId parametre olarak eklenebilir
  }

  bookmark(postId: string) {
    this.toast(`Post ${postId} işaretlendi`);
    this.openDropdownForPostId = null;
  }

  report(postId: string) {
    this.toast(`Post ${postId} rapor edildi`);
    this.openDropdownForPostId = null;
  }

  mute(postId: string) {
    this.toast(`Post ${postId} sessize alındı`);
    this.openDropdownForPostId = null;
  }

  onLike() {
    this.toast('Beğenildi');
    // like API çağrısı eklenebilir, postId ekleyebilirsin
  }

  submitComment(e: Event) {
    e.preventDefault();
    const value = this.commentInput?.nativeElement?.value || '';
    if (value.trim()) {
      this.toast('Yorum gönderildi');
      this.commentInput!.nativeElement.value = '';
    }
  }

  toast(msg: string, ms = 2200) {
    clearTimeout(this.toastTimer);
    this.toastText = msg;
    this.showToast = true;
    this.toastTimer = setTimeout(() => { this.showToast = false; }, ms);
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(ev: Event) {
    // dropdown dışına tıklanınca kapat
    if (this.openDropdownForPostId) {
      this.openDropdownForPostId = null;
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.toastTimer);
  }

  posts: Post[] = [
    {
      id: 'p1',
      author: 'Melis Tango',
      authorAvatar: 'https://i.pravatar.cc/50?img=5',
      caption: 'Dün akşamki milonga çok keyifliydi ❤️ Yeni partnerimle ilk tandam! 😍',
      imageUrl: 'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
      city: 'Ankara',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      likesCount: 396,
      commentsCount: 15,
      topComments: [
        { id: 'c1', author: 'TangoLover42', avatarUrl: 'https://i.pravatar.cc/40?img=3', text: 'Yeni partner mi 😍 kim o?', createdAt: new Date(Date.now() - 1000*60*60*6).toISOString(), likes: 2 }
      ],
    },
    {
      id: 'p2',
      author: 'Emre Karaca',
      authorAvatar: 'https://i.pravatar.cc/50?img=42',
      caption: 'Kendi koreografimizi ilk kez sahnede denedik. Videonun tamamı yakında 💃🕺',
      imageUrl: 'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp',
      city: 'İstanbul',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      likesCount: 120,
      commentsCount: 9,
      topComments: [
        { id: 'c2', author: 'EsraDans', text: 'Müthişsiniz!', createdAt: new Date().toISOString(), likes: 5 }
      ],
    },
    {
      id: 'p3',
      author: 'Sibel Tango',
      authorAvatar: 'https://i.pravatar.cc/50?img=17',
      caption: "Tango'da hissettiğim bağ, müzikle kurduğum ilişki... anlatılmaz yaşanır. 🙏🎵",
      imageUrl: 'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
      city: 'İzmir',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      likesCount: 124,
      commentsCount: 6,
      topComments: [],
    }
  ];
  originalPosts: Post[] = this.posts;
}
