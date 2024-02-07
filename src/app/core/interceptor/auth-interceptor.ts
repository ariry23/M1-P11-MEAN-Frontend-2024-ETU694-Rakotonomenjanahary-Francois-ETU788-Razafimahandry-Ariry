import { Injectable } from "@angular/core";

import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { TokenService } from "../services/token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.tokenService.getToken();
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