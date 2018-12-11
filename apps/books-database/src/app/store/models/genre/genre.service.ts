import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { Genre } from './genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  model = 'genres';

  constructor(private http: HttpClient) {}

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  all() {
    return this.http.get<Genre[]>(this.getUrl());
  }

  
}
