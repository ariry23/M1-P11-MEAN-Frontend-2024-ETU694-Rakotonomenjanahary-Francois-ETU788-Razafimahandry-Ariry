import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private cookieService : CookieService) {}
  setToken(token: string): void {
      window.sessionStorage.setItem("appToken", token);
  }

  getToken(): string {
    return window.sessionStorage.getItem("appToken");
  }

  removeToken(): void {
    window.sessionStorage.removeItem("appToken");
  }

  hasToken(): boolean {
    return  sessionStorage.getItem("appToken") !== null;
  }
}
