import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Injectable()
export class NavigationInterceptor  {

  constructor(private router: Router) {
    console.log('mandalo interceptor') ; 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
       
        console.log('url :' + event.url);
      }
    });
  }

}
