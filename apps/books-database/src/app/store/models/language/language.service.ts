import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { Language } from './language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  model = 'languages';

  constructor(private http: HttpClient) {}

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  all() {
    return this.http.get<Language[]>(this.getUrl());
  }

  
}
