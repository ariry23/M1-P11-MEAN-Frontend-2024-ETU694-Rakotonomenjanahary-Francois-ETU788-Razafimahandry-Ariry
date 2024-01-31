import { Injectable } from "@angular/core";

import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { UtilCookieService } from "../services/util-cookie.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private utilCookieService: UtilCookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.utilCookieService.getToken();
        if (token) {
            const authReq = req.clone({
                setHeaders: {
                    //Authorization: `Bearer ${token}`,
                    'x-access-token' : token
                },
            });

            return next.handle(authReq);
        }

        return next.handle(req);
    }
}