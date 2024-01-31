import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UtilCookieService {
  constructor(private cookieService : CookieService) {}
  setToken(token: string): void {
    this.cookieService.set('appToken', token);
  }

  getToken(): string {
    return this.cookieService.get('appToken');
  }

  removeToken(): void {
    this.cookieService.delete('appToken');
  }
}
