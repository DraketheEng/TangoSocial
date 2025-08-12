export interface Comment {
  id: string;
  author: string;
  avatarUrl?: string;
  text: string;
  createdAt: string;
  likes?: number;
}

export interface Post {
  id: string;
  author: string;
  authorAvatar?: string;
  caption?: string;
  imageUrl?: string;
  city?: string;
  createdAt: string;
  likesCount: number;
  commentsCount?: number;
  topComments?: Comment[];
}
