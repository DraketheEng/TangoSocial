import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  caption: string;
  imageUrl?: string;
  city?: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  topComments: any[];
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit, OnDestroy {
  form: FormGroup;
  previewOpen = false;
  filePreview: string | ArrayBuffer | null = null;
  fileName: string | null = null;
  maxChars = 500;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      caption: ['', [Validators.maxLength(this.maxChars)]],
      city: [''],
      tags: [''],
      isPublic: [true],
      file: [null]
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.clearFile();
      return;
    }
    const file = input.files[0];
    this.form.patchValue({ file });
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeFile() {
    this.clearFile();
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  private clearFile() {
    this.filePreview = null;
    this.fileName = null;
    this.form.patchValue({ file: null });
  }

  get captionLength() {
    const v = this.form.get('caption')?.value;
    return v ? String(v).length : 0;
  }

  get tagList(): string[] {
    const raw = this.form.get('tags')?.value || '';
    return raw
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0)
      .slice(0, 8); // limit preview to 8 tags for aesthetics
  }

  openPreview() {
    // Basic validation: caption length ok
    const len = this.captionLength;
    if (len > this.maxChars) {
      // could show a toast here
      return;
    }
    this.previewOpen = true;
    // prevent background scroll
    document.body.style.overflow = 'hidden';
  }

  closePreview() {
    this.previewOpen = false;
    document.body.style.overflow = '';
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // TODO: Replace with actual upload logic / event emit
    const payload = {
      caption: this.form.value.caption,
      city: this.form.value.city,
      tags: this.tagList,
      isPublic: this.form.value.isPublic,
      fileName: this.fileName
    };

    console.log('Submit post payload:', payload);
    // temporary UX: close preview and reset form
    this.closePreview();
    this.form.reset({ isPublic: true });
    this.clearFile();
    // optionally show a success toast — integrate with your toast system
  }
}
