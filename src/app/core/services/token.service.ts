import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private cookieService : CookieService) {}
  setToken(token: string): void {
      window.localStorage.setItem("appToken", token);
  }

  getToken(): string {
    return window.localStorage.getItem("appToken");
  }

  removeToken(): void {
    window.localStorage.removeItem("appToken");
  }

  hasToken(): boolean {
    return  localStorage.getItem("appToken") !== null;
  }
}
