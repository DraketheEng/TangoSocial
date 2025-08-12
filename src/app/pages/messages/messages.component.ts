import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Message {
  sender: string;
  avatar: string;
  text?: string;
  time: string;
  status?: 'Sent' | 'Delivered' | 'Seen';
  imageUrl?: string; // optional attachment
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  unread?: boolean;
  typing?: boolean; // simülasyon için: karşı taraf yazıyor
  messages: Message[];
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesEnd') private messagesEndRef!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') private fileInputRef!: ElementRef<HTMLInputElement>;

  currentUser = 'Drake the King';
  newMessage = '';
  showEmojiPicker = false;
  searchQ = '';

  conversations: Conversation[] = [];
  selectedConversation!: Conversation;

  // Simple emoji set (expandable)
  emojis = ['😊','😂','😍','🔥','🎶','💃','🕺','👏','❤️','🤝','🎉','🤖'];

  constructor() {}

  ngOnInit(): void {
    this.seed();
    this.selectedConversation = this.conversations[0];
    this.selectedConversation.unread = false;
    this.simulateTypingForDemo();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  seed() {
    this.conversations = [
      {
        id: 1,
        name: 'Öyküm Çayır',
        avatar: 'https://i.pravatar.cc/150?img=47',
        unread: true,
        messages: [
          { sender: 'Öyküm Çayır', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Merhaba! Hafta sonu atölye için müsaitsiniz mi?', time: '12:45', status: 'Delivered' },
          { sender: this.currentUser, avatar: 'https://i.pravatar.cc/150?u=drake', text: 'Evet, kayıtlıyım. Saat kaçta?', time: '12:46', status: 'Seen' }
        ]
      },
      {
        id: 2,
        name: 'Lord F. Aydemir',
        avatar: 'https://i.pravatar.cc/150?img=23',
        unread: false,
        messages: [
          { sender: 'Lord F. Aydemir', avatar: 'https://i.pravatar.cc/150?img=23', text: 'Prova notları gönderildi.', time: '09:20', status: 'Delivered' }
        ]
      },
      {
        id: 3,
        name: 'Xendoks',
        avatar: 'https://i.pravatar.cc/150?img=32',
        unread: false,
        messages: [
          { sender: 'Xendoks', avatar: 'https://i.pravatar.cc/150?img=32', text: 'ARABAARABAARABAAARABAARABAARABAARABAARABAARABARABAARABA!', time: '08:15', status: 'Delivered' },
          { sender: 'Xendoks', avatar: 'https://i.pravatar.cc/150?img=32', text: 'ARABARABAA!', time: '08:15', status: 'Delivered' },
          { sender: 'Xendoks', avatar: 'https://i.pravatar.cc/150?img=32', text: 'ARAAARABAARABAARABAARABAA!', time: '08:15', status: 'Delivered' },
          { sender: 'Xendoks', avatar: 'https://i.pravatar.cc/150?img=32', text: 'ARAARABABA!', time: '08:15', status: 'Delivered' }

        ]
      }
    ];
  }

  selectConversation(convo: Conversation) {
    this.selectedConversation = convo;
    convo.unread = false;
    this.showEmojiPicker = false;
  }

  filteredConversations(): Conversation[] {
    if (!this.searchQ?.trim()) return this.conversations;
    const q = this.searchQ.toLowerCase();
    return this.conversations.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.messages.some(m => (m.text || '').toLowerCase().includes(q))
    );
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const now = new Date();
    const msg: Message = {
      sender: this.currentUser,
      avatar: 'https://i.pravatar.cc/150?u=drake',
      text: this.newMessage,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent'
    };
    this.selectedConversation.messages.push(msg);
    this.newMessage = '';
    this.showEmojiPicker = false;
    this.selectedConversation.unread = false;

    setTimeout(() => msg.status = 'Delivered', 700);
    setTimeout(() => msg.status = 'Seen', 1600);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(e: string) {
    this.newMessage = this.newMessage + e;
  }

  attachFileClick() {
    this.fileInputRef.nativeElement.click();
  }

  async onFileSelected(ev: Event) {
    const inp = ev.target as HTMLInputElement;
    if (!inp.files || inp.files.length === 0) return;
    const file = inp.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const now = new Date();
      const msg: Message = {
        sender: this.currentUser,
        avatar: 'https://i.pravatar.cc/150?u=drake',
        imageUrl: dataUrl,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Sent'
      };
      this.selectedConversation.messages.push(msg);
      inp.value = '';
      setTimeout(() => msg.status = 'Delivered', 700);
      setTimeout(() => msg.status = 'Seen', 1600);
    };
    reader.readAsDataURL(file);
  }

  startNewChat() {
    const id = Date.now();
    const convo: Conversation = {
      id,
      name: 'Yeni Konuşma',
      avatar: 'https://i.pravatar.cc/150?u=' + id,
      unread: false,
      messages: []
    };
    this.conversations.unshift(convo);
    this.selectConversation(convo);
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesEndRef) {
        this.messagesEndRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    } catch (err) {
      // ignore
    }
  }

  simulateTypingForDemo() {
    setInterval(() => {
      const convo = this.conversations[Math.floor(Math.random() * this.conversations.length)];
      if (!convo) return;
      convo.typing = true;
      setTimeout(() => {
        convo.typing = false;
        if (Math.random() > 0.6) {
          const now = new Date();
          convo.messages.push({
            sender: convo.name,
            avatar: convo.avatar,
            text: ['Harika!', 'Tamamdır.', 'Görüşürüz.', 'Teşekkürler!'][Math.floor(Math.random() * 4)],
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Delivered'
          });
        }
      }, 1800 + Math.random() * 2000);
    }, 20000);
  }

  getLastMessageDisplay(convo: Conversation): string {
    const messages = convo.messages || [];
    if (!messages.length) return '';
    const lastMsg = messages[messages.length - 1];
    const txt = lastMsg.text || (lastMsg.imageUrl ? '📷 Görsel' : '');
    if (lastMsg.sender !== this.currentUser) {
      return txt.length > 40 ? txt.slice(0, 40) + '…' : txt;
    } else {
      return this.getTimeAgo(lastMsg.time);
    }
  }

  getLastMessageClass(convo: Conversation): string {
    const messages = convo.messages || [];
    if (!messages.length) return 'text-gray-500';
    const lastMsg = messages[messages.length - 1];
    return lastMsg.sender === this.currentUser ? 'text-gray-500' : 'text-black font-semibold';
  }


  getTimeAgo(timeStr: string): string {
    if (!timeStr) return '';
    let then: number | null = null;

    const maybeDate = new Date(timeStr);
    if (!isNaN(maybeDate.getTime())) {
      if (timeStr.includes('T') || timeStr.includes('-')) {
        then = maybeDate.getTime();
      }
    }

    if (then === null && /^\d{1,2}:\d{2}$/.test(timeStr)) {
      const [h, m] = timeStr.split(':').map(s => parseInt(s, 10));
      const d = new Date();
      d.setHours(h, m, 0, 0);
      then = d.getTime();
    }

    if (then === null) return timeStr;

    const now = Date.now();
    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 60) return `${diffSec}s`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} dk`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} saat`;
    return `${Math.floor(diffSec / 86400)} gün`;
  }
}
