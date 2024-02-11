import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../core/services/token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild, CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
 
    if(this.tokenService.hasToken())
    {
        let decodedToken : any = jwtDecode(this.tokenService.getToken()) ; 
        let roleName : string = decodedToken.role.name ; 
        if(roleName === "admin")
        {
          return true ;
        }
        else{
            this.router.navigate(["/"]);
            return false ; 
        }
    }
    this.router.navigate([state.url]);
    return false ; 
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(this.tokenService.hasToken())
    {
        let decodedToken : any = jwtDecode(this.tokenService.getToken()) ; 
        let roleName : string = decodedToken.role.name ; 
        if(roleName === "admin")
        {
         
          return true ;
        }
        else{
            this.router.navigate(["/"]);
            return false ; 
        }
    }
    this.router.navigate([state.url]);
    return false ; 
  }
}



