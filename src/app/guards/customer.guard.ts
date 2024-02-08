import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../core/services/token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CustomerGuard implements CanActivateChild, CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let isCustomer : boolean = false ; 
    if(this.tokenService.hasToken())
    {
        let decodedToken : any = jwtDecode(this.tokenService.getToken()) ; 
        let roleName : string = decodedToken.role.name ; 
        if(roleName === "customer")
        {
          isCustomer = true ; 
          return true ;
        }
        else{
            return false ; 
        }
    }
    this.router.navigate(['/auth/signin']);
    return false ; 
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let isCustomer : boolean = false ; 
    if(this.tokenService.hasToken())
    {
        let decodedToken : any = jwtDecode(this.tokenService.getToken()) ; 
        let roleName : string = decodedToken.role.name ; 
        if(roleName === "customer")
        {
          isCustomer = true ; 
          return true ;
        }
        else{
          return false ; 
        }
    }
    this.router.navigate(['/auth/signin']);
    return false ; 
  }
}



