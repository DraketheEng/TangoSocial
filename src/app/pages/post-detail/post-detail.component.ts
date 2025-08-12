import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Comment {
  id: number;
  author: string;
  text: string;
  avatarUrl?: string;
  createdAt: Date;
  likes?: number;
}

interface Post {
  id: number;
  author: string;
  authorAvatar?: string;
  imageUrl?: string;
  caption: string;
  city?: string;
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  topComments?: Comment[];
  tags?: string[];
}

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId!: number;
  post?: Post;
  openDropdownForPostId: number | null = null;
  shareModal = false;
  newComment = '';
  // dummy dataset (could be replaced by an API)
  private posts: Post[] = [
    {
      id: 101,
      author: 'Drake the King',
      authorAvatar: 'https://i.pravatar.cc/100?u=drake_the_king',
      imageUrl: 'https://source.unsplash.com/collection/190727/1200x1400?sig=11',
      caption: 'Geçen gece sahne sonrası hızlı prova ✨',
      city: 'İstanbul',
      createdAt: new Date('2025-07-21T20:00:00Z'),
      likesCount: 245,
      commentsCount: 18,
      topComments: [
        { id: 1, author: 'Carlos', text: 'Harika!', avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg', createdAt: new Date(), likes: 5 },
        { id: 2, author: 'Lucía', text: 'Bir dahaki sefer ben de!', avatarUrl: 'https://randomuser.me/api/portraits/women/29.jpg', createdAt: new Date(), likes: 3 }
      ],
      tags: ['tango','milonga']
    },
    {
      id: 105,
      author: 'Drake the King',
      authorAvatar: 'https://i.pravatar.cc/100?u=drake_the_king',
      // imageUrl: undefined -> text-only post
      caption: 'Bugün prova notları: pivot hızını azalt, gövde sabit kalsın.',
      city: 'İstanbul',
      createdAt: new Date('2025-08-05T18:00:00Z'),
      likesCount: 34,
      commentsCount: 2,
      topComments: []
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      const id = Number(pm.get('id'));
      this.postId = id || this.posts[0].id;
      this.loadPost(this.postId);
    });
  }

  private loadPost(id: number) {
    this.post = this.posts.find(p => p.id === id);
    if (!this.post) {
      // fallback: redirect to profile or 404
      console.warn('Post bulunamadı, profile sayfasına yönlendiriyorum.');
      this.router.navigate(['/']);
    }
  }

  onSave(e: Event) {
    e.stopPropagation();
    console.log('Kaydetildi (dummy):', this.post?.id);
    // UI feedback (toast) ekle
  }

  toggleMore(e: Event, postId: number) {
    e.stopPropagation();
    this.openDropdownForPostId = this.openDropdownForPostId === postId ? null : postId;
  }

  report(postId: number) {
    console.log('Rapor edildi (dummy):', postId);
    this.openDropdownForPostId = null;
  }

  mute(postId: number) {
    console.log('Sessize alındı (dummy):', postId);
    this.openDropdownForPostId = null;
  }

  bookmark(postId: number) {
    console.log('İşaretlendi (dummy):', postId);
    this.openDropdownForPostId = null;
  }

  onLike(e?: Event) {
    if (e) e.stopPropagation();
    if (!this.post) return;
    this.post.likesCount++;
  }

  openShare(e?: Event) {
    if (e) e.stopPropagation();
    this.shareModal = true;
  }

  closeShare() {
    this.shareModal = false;
  }

  submitComment(e?: Event) {
    if (e) e.preventDefault();
    if (!this.post || !this.newComment.trim()) return;
    const c: Comment = {
      id: Date.now(),
      author: 'Sen', // gerçek kullanıcı bilgisi ile değiştir
      text: this.newComment.trim(),
      avatarUrl: 'https://i.pravatar.cc/80?u=current',
      createdAt: new Date(),
      likes: 0
    };
    this.post.topComments = this.post.topComments || [];
    this.post.topComments.unshift(c);
    this.post.commentsCount++;
    this.newComment = '';
  }
}
