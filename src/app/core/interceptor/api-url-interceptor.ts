import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class ApiUrlInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request and append the base URL
        let finalUrl = request.url.startsWith("http") ? request.url : environment.apiBaseUrl + '/' + request.url ; 
        const apiRequest = request.clone({ url: finalUrl });
        return next.handle(apiRequest);
      }
}
