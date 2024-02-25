import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(private loadingService: LoaderService , private spinnerService: NgxSpinnerService) 
  { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught')
    //this.totalRequests++;
    //this.loadingService.setLoading(true);
    this.spinnerService.show() ; 
    return next.handle(request).pipe(
      finalize(() => {
        console.log('ending') ; 
        this.spinnerService.hide();
        /*this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        } */
      })
    );
  }
}
