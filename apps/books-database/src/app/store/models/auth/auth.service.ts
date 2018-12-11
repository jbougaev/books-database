import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  model = 'auth/login';

  constructor(private http: HttpClient) {}

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  getToken(email, password) {
    return this.http.post<string>(this.getUrl(), {email, password} );
  }

}

