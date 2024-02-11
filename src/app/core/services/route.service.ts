import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private lastSuccessfulRoute: string;
  constructor(private router: Router ,private tokenService: TokenService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("event :") ; 
        console.log(event) ; 
        this.lastSuccessfulRoute = event.urlAfterRedirects;
      }
    });
  }

  setLastSuccessfulRoute(route: string): void {
    window.localStorage.setItem("lastSuccessfulRoute", route);
  }

  getLastSuccessfulRoute(): string {
    return this.lastSuccessfulRoute;
  }

  redirectToMainPage() : void {
      let token  = this.tokenService.getToken();
      let decodedToken : any = jwtDecode(token) ;
      let roleName : string = decodedToken.role.name ;
      if(roleName === "customer")
      {
        this.router.navigate(['/service/list']);
      }
      else if(roleName === "employee"){
        this.router.navigate(['/profil-horaire']);
      }
      else{
        this.router.navigate(['/personnel']);
      }
  }

  setMainRoute()
  {
    let token  = this.tokenService.getToken();
    let decodedToken : any = jwtDecode(token) ;
    let roleName : string = decodedToken.role.name ;
    if(roleName === "customer")
    {
      window.localStorage.setItem("mainRoute", "/service/list");
    }
    else if(roleName === "employee"){
      window.localStorage.setItem("mainRoute", "/profil-horaire");
    }
    else{
      window.localStorage.setItem("mainRoute", "/personnel");
      //window.localStorage.setItem("mainRoute", "/service/list");
    }


    //window.localStorage.setItem("mainRoute", "/service/list");
  }
  getMainRoute(mainRoute : string) : string
  {
     return window.localStorage.getItem("mainRoute");
  }

}
