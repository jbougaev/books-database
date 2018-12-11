import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, startWith, switchMap, catchError} from 'rxjs/operators';
import { Book } from '../../models/books/book.model';
import { BooksService } from '../../models/books/books.service';
import * as BooksActions from './books.actions';
import { Observable, of } from 'rxjs';

@Injectable()
export class BooksEffects {

  constructor(private actions$: Actions, private booksService: BooksService) { }

  @Effect()
  loadBooks$: Observable<{}> | Observable<BooksActions.BooksLoaded> = this.actions$
    .pipe(
      ofType(BooksActions.BooksActionTypes.LoadBooks),
    //  startWith(new BooksActions.LoadBooks()),
     switchMap(() =>
        this.booksService
          .all()
          .pipe(
            map((books: Book[]) =>
              new BooksActions.BooksLoaded(books)),
              catchError((error: any) => of(new BooksActions.LoadBooksError(error)))
          )));

  @Effect()
  addBook$ : Observable<{}> | Observable<BooksActions.BookAdded> = this.actions$
    .pipe(
      ofType(BooksActions.BooksActionTypes.AddBook),
      map((action: BooksActions.AddBook) => action.payload),
      switchMap((book: Book) =>
        this.booksService
          .create(book)
          .pipe(
            map((books: Book) => new BooksActions.BookAdded(books)),
            catchError((error: any) => of(new BooksActions.AddBookError(error)))
          ))
    );

  @Effect()
  updateBook$ = this.actions$
    .pipe(
      ofType(BooksActions.BooksActionTypes.UpdateBook),
      map((action: BooksActions.UpdateBook) => action.payload),
      switchMap((book: Book) =>
        this.booksService
          .update(book)
          .pipe(
            map((books: Book) => new BooksActions.BookUpdated(books)),
            catchError((error: any) => of(new BooksActions.UpdateBookError(error)))
          ))
    );

  @Effect()
  deleteBook$: Observable<{}> | Observable<BooksActions.BookDeleted> = this.actions$
    .pipe(
      ofType(BooksActions.BooksActionTypes.DeleteBook),
      map((action: BooksActions.DeleteBook) => action.payload),
      switchMap((book: Book) =>
        this.booksService
          .delete(book)
          .pipe(
            map((books: Book) => new BooksActions.BookDeleted(book)),
            catchError((error: any) => of(new BooksActions.DeleteBookError(error)))
          ))
    );
}
