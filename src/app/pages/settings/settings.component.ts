import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type LinkedAccount = { provider: 'facebook' | 'google' | 'apple' | 'instagram', connected: boolean };

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  prefsForm!: FormGroup;

  // UI state
  showFreezeConfirm = false;
  showDeleteConfirm = false;
  show2faModal = false;
  avatarPreview: string | ArrayBuffer | null = null;

  // Dummy user + linked accounts
  user = {
    id: 42,
    name: 'E. Can Ağırbaş',
    username: 'drake_the_king',
    email: 'drake@example.com',
    bio: 'Tango, kod ve gece.',
    location: 'İstanbul, TR',
    timezone: 'Europe/Istanbul',
    language: 'Türkçe',
    showEmail: false,
    profileVisibility: 'public' as 'public' | 'private' | 'followers',
    twoFactor: false
  };

  linkedAccounts: LinkedAccount[] = [
    { provider: 'google', connected: true },
    { provider: 'facebook', connected: false },
    { provider: 'apple', connected: false },
  ];

  timezones = [
    'Europe/Istanbul', 'UTC', 'Europe/London', 'America/New_York', 'America/Los_Angeles'
  ];

  languages = ['Türkçe', 'English', 'Español', 'Français'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      avatar: [null],
      name: [this.user.name, [Validators.required, Validators.minLength(2)]],
      username: [this.user.username, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]{3,30}$/)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      bio: [this.user.bio],
      location: [this.user.location],
      timezone: [this.user.timezone],
      language: [this.user.language],
      profileVisibility: [this.user.profileVisibility],
      showEmail: [this.user.showEmail]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });

    this.prefsForm = this.fb.group({
      notifyMessages: [true],
      notifyMatches: [true],
      notifyEvents: [true],
      weeklyDigest: [false],
      twoFactorEnabled: [this.user.twoFactor]
    });
  }

  // Custom validator
  passwordsMatch(group: FormGroup) {
    const n = group.get('newPassword')?.value;
    const c = group.get('confirmPassword')?.value;
    return n === c ? null : { mismatch: true };
  }

  // Avatar preview
  onAvatarChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.avatarPreview = null;
      this.profileForm.patchValue({ avatar: null });
      return;
    }
    const file = input.files[0];
    this.profileForm.patchValue({ avatar: file });
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview = reader.result;
    reader.readAsDataURL(file);
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const payload = { ...this.profileForm.value };
    console.log('Profile saved (dummy):', payload);
    // merge into local user (dummy)
    Object.assign(this.user, {
      name: payload.name,
      username: payload.username,
      email: payload.email,
      bio: payload.bio,
      location: payload.location,
      timezone: payload.timezone,
      language: payload.language,
      profileVisibility: payload.profileVisibility,
      showEmail: payload.showEmail
    });
    // success UX would go here (toast)
  }

  changePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    console.log('Password change requested (dummy).');
    this.passwordForm.reset();
  }

  savePrefs() {
    if (this.prefsForm.invalid) return;
    console.log('Preferences saved (dummy):', this.prefsForm.value);
  }

  toggleAccount(acc: LinkedAccount) {
    acc.connected = !acc.connected;
    console.log(`${acc.provider} connection toggled ->`, acc.connected);
  }

  downloadData() {
    // Create JSON blob from dummy user + minimal data
    const data = {
      user: this.user,
      settings: {
        profile: this.profileForm.value,
        prefs: this.prefsForm.value,
        linkedAccounts: this.linkedAccounts
      },
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tangosocial_user_${this.user.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  freezeAccount() {
    // toggle modal
    this.showFreezeConfirm = true;
  }

  confirmFreeze() {
    console.log('Account freeze requested (dummy).');
    this.showFreezeConfirm = false;
    // reflect in UI / show toast
  }

  cancelFreeze() {
    this.showFreezeConfirm = false;
  }

  requestDelete() {
    this.showDeleteConfirm = true;
  }

  confirmDelete() {
    console.log('Account delete requested (dummy).');
    this.showDeleteConfirm = false;
    // perform deletion flow
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  enable2FA() {
    this.show2faModal = true;
  }

  close2FAModal() {
    this.show2faModal = false;
    // pretend it's enabled
    this.prefsForm.patchValue({ twoFactorEnabled: true });
    this.user.twoFactor = true;
  }
}
