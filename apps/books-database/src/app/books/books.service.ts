import { Injectable, EventEmitter } from '@angular/core';
import { Book } from '../store';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books: Subject<Book[]> = new BehaviorSubject<Book[]>(new Array<Book>());
  private searchResults: Subject<Book[]> = new BehaviorSubject<Book[]>(new Array<Book>());

  get books$() {
    return this.books.asObservable().pipe(filter(books => !!books));
  }

  get searchResults$() :Observable<Book[]> {
    return this.searchResults.asObservable().pipe(filter(books => !!books));
  }

  addSearchResults(data: Book[]) {
    this.searchResults.next(data);
  }

  addBooks(data: Book[]) {
    this.books.next(data);
  }

  deleteBookE = new EventEmitter();
  searcheBooksE = new EventEmitter();

  deleteBook(book: Book) {
    this.deleteBookE.emit(book);
  }

  searchBooks(query: string) {
    this.searcheBooksE.emit(query);
  }
}
