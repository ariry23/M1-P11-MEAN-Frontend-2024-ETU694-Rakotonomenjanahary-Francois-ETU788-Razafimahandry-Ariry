import { CanActivateFn } from '@angular/router';
import { UtilCookieService } from '../core/services/util-cookie.service';


export class AuthGuard {
  constructor(private utilCookieService: UtilCookieService) {}

  canActivateChild(): boolean {
    return this.utilCookieService.hasToken() ; 
  }
}
