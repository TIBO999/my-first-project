import {  Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  get(localStorageKey: string) {
    const savedUsers = localStorage.getItem(localStorageKey);
    return savedUsers ? JSON.parse(savedUsers) : null;
  }
  set(localStorageKey: string, value: any) {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }
}
