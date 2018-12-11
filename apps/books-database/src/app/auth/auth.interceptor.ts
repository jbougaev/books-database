import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, switchMap } from "rxjs/operators";


import { AuthFacade } from '../store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authFacade: AuthFacade) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authFacade.token$.pipe(
            take(1),
            switchMap((token: string) => {

                const copiedReq = req.clone({
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    })
                });
                return next.handle(copiedReq);
            }));
    }
}


