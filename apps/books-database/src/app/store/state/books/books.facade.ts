import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as BooksActions from './books.actions';
import { BooksState } from './books.reducer';
import * as Selectors from "../index";
import { take } from 'rxjs/operators';
import {Observable} from "rxjs";
import { Book } from '../../models/books/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksFacade {
  allBooks$ : Observable<Book[]> = this.store.pipe(select(Selectors.selectAllBooks));
  selectedBook$: Observable<Book> = this.store.pipe(select(Selectors.selectCurrentBook));
  isLoaded$ : Observable<boolean> = this.store.pipe(select(Selectors.getBooksLoaded));
  inEditMode$: Observable<boolean> = this.store.pipe(select(Selectors.inEditMode));
  selectedBookByAuthorAndTitle$;

  constructor(private store: Store<BooksState> ) {}

  isBooksLoaded(): Observable<boolean>{
    return this.store.select((s: any) => 
    s.books.isLoaded)
      .pipe(
        take(1));
  }

  loadBooks() {
    this.store.dispatch(new BooksActions.LoadBooks());
  }

  selectBookByAuthorAndTitle(author, title) {
    this.selectedBookByAuthorAndTitle$ = this.store.pipe(select(Selectors.selectBookByAuthorAndTitle, {author: author, title: title}));
    this.store.dispatch(new BooksActions.BookSelected({author, title}));
  }

  selectBook(bookId) {
    this.store.dispatch(new BooksActions.BookSelected(bookId));
  }
  
  addBook(book) {
    this.store.dispatch(new BooksActions.AddBook(book));
  }

  updateBook(book) {
    this.store.dispatch(new BooksActions.UpdateBook(book));
  }

  deleteBook(book) {
    this.store.dispatch(new BooksActions.DeleteBook(book));
  }

  stopEdit(){
    this.store.dispatch(new BooksActions.StopEdit());
  }

  startEdit(){
    this.store.dispatch(new BooksActions.StartEdit());
  }
}
