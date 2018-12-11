import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  model = 'books';

  constructor(private http: HttpClient) {}

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.http.get<Book[]>(this.getUrl());
  }

  load(id) {
    return this.http.get<Book>(this.getUrlForId(id));
  }

  create(book: Book) {
    return this.http.post(this.getUrl(), book);
  }

  update(book: Book) {
    return this.http.patch(this.getUrlForId(book.id), book);
  }

  delete(book: Book) {
    return this.http.delete(this.getUrlForId(book.id));
  }
}
