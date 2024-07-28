import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageAvailable: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.localStorageAvailable = isPlatformBrowser(this.platformId);
  }

  getItem(key: string): string | null {
    return this.localStorageAvailable ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.localStorageAvailable) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.localStorageAvailable) {
      localStorage.removeItem(key);
    }
  }
}
