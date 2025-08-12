import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Kullanıcı (Drake)
  user = {
    id: 1,
    name: 'Drake the King',
    title: 'Tango Eğitmeni & Kodcu',
    location: 'İstanbul, TR',
    avatar: 'https://i.pravatar.cc/200?u=drake_the_king',
    bio: 'Tango, kod ve gece. Partner arayanlara ipucu veririm.',
    followers: 3420,
    following: 312,
    lessons: '2.1K'
  };

  // Dummy paylaşımlar (grid)
  posts: Post[] = [
    {
      id: 101,
      imageUrl: 'https://picsum.photos/seed/picsum/200/300',
      caption: 'Geçen gece sahne sonrası hızlı prova ✨',
      likesCount: 245,
      commentsCount: 18,
      createdAt: '2025-07-21T20:00:00Z',
      city: 'İstanbul'
    },
    {
      id: 102,
      imageUrl: 'https://picsum.photos/seed/picsum/200/300',
      caption: 'Milonga vibes — partner pracı.',
      likesCount: 128,
      commentsCount: 12,
      createdAt: '2025-07-14T22:30:00Z',
      city: 'Ankara'
    },
    {
      id: 103,
      imageUrl: 'https://picsum.photos/seed/picsum/200/300',
      caption: 'Teknik: pivot kontrolü. Kısa notlar.',
      likesCount: 98,
      commentsCount: 7,
      createdAt: '2025-06-30T18:00:00Z',
      city: 'İzmir'
    },
    {
      id: 104,
      imageUrl: 'https://picsum.photos/seed/picsum/200/300',
      caption: 'Sahne ışıklandırma çalışması — prova.',
      likesCount: 76,
      commentsCount: 5,
      createdAt: '2025-06-10T19:00:00Z',
      city: 'İstanbul'
    },
    {
      id: 105,
      imageUrl: undefined,
      caption: 'Bugün prova notları: pivot hızını azalt, gövde sabit kalsın.',
      likesCount: 34,
      commentsCount: 2,
      createdAt: '2025-08-05T18:00:00Z',
      city: 'İstanbul'
    }
  ];

  following = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleFollow(event?: Event) {
    if (event) event.stopPropagation();
    this.following = !this.following;
    // UI feedback (toast) burada eklenebilir
    console.log(this.following ? 'Takip edildi' : 'Takip bırakıldı');
  }

  openPost(postId: number) {
    this.router.navigate(['/gonderi-detay']);
  }

  onPostAction(event: Event, action: string, post: Post) {
    event.stopPropagation();
    console.log('Post action', action, post.id);
    // örn: beğen, kaydet gibi dummy işlemler
    if (action === 'like') {
      post.likesCount++;
    }
  }

  loadMore() {
    // Dummy: tekrar aynı postları ekleyerek "load more" hissi ver
    const more = this.posts.map(p => ({ ...p, id: p.id + Math.floor(Math.random() * 1000) }));
    this.posts = [...this.posts, ...more];
  }
}
