import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private lastSuccessfulRoute: string;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.lastSuccessfulRoute = event.urlAfterRedirects;
      }
    });
  }

  setLastSuccessfulRoute(route: string): void {
    window.sessionStorage.setItem("lastSuccessfulRoute", route);
  }

  getLastSuccessfulRoute(): string {
    return this.lastSuccessfulRoute;
  }




}
