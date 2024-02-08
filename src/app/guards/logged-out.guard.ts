import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../core/services/token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuard implements CanActivate , CanActivateChild {
  constructor(private tokenService: TokenService , private router : Router) {}
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("logged-out guard check") ; 
    if(this.tokenService.hasToken())
    {
        this.router.navigate(['/']);
        return false ;
    }
    else{
      console.log("dont has token") ; 
        return true ; 
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("logged-out guard check") ; 
    if(this.tokenService.hasToken())
    {
        this.router.navigate(['/auth/signin']);
        return false ;
    }
    else{
        return true ; 
    }
  
  }
}



