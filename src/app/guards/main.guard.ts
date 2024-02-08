import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../core/services/token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate , CanActivateChild {
  constructor(private tokenService: TokenService , private router : Router) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("mandalo ato ve "); 
    if(this.tokenService.hasToken())
    {
       
        let decodedToken : any = jwtDecode(this.tokenService.getToken()) ; 
        let roleName : string = decodedToken.role.name ; 
        if(roleName === "customer")
        {
            this.router.navigate(['/service/list']);
            return true ;
        }
        else if(roleName === "employee"){
            this.router.navigate(['/profil-horaire']);
            return true ;
        }
        else{
          return true ;
        }
    }
    else{
        console.log("ato") ; 
        this.router.navigate(['/auth/signin']);
        return false ; 
    }
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("mandalo ato ve "); 
    if(this.tokenService.hasToken())
    {
        let decodedToken : any = jwtDecode(this.tokenService.getToken()) ; 
        let roleName : string = decodedToken.role.name ; 
        if(roleName === "customer")
        {
            this.router.navigate(['/service/list']);
            return true ;
        }
        else if(roleName === "employee"){
            this.router.navigate(['/profil-horaire']);
            return true ;
        }
        else{
          return true ;
        }
    }
    else{
        this.router.navigate(['/auth/signin']);
        return false ; 
    }
  
  }
}



