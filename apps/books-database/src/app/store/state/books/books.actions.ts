import { Action } from '@ngrx/store';
import {Book} from "../../models/books/book.model";

export enum BooksActionTypes {
  LoadBooks = '[Books] Load Books',
  BooksLoaded = '[Books] Books Loaded',
  BookSelected = '[Books] Book Selected',
  AddBook = '[Books] Add Book',
  BookAdded = '[Books] Book Added',
  UpdateBook = '[Books] Update Book',
  BookUpdated = '[Books] Book Updated',
  DeleteBook = '[Books] Delete Book',
  BookDeleted = '[Books] Book Deleted',
  LoadBooksError = '[Error] Load Books Error',
  UpdateBookError = '[Error] Update Book Error',
  DeleteBookError = '[Error] Delete Book Error',
  AddBookError = '[Error] Add Book Error',
  StartEdit= '[Books] Start Editing',
  StopEdit = '[Books] Stop Editing',
}

export class BookSelected implements Action {
  readonly type = BooksActionTypes.BookSelected;
  constructor(public payload) { }
}

export class LoadBooks implements Action {
  readonly type = BooksActionTypes.LoadBooks;
  constructor() {}
}

export class BooksLoaded implements Action {
  readonly type = BooksActionTypes.BooksLoaded;
  constructor(public payload: Book[]) {}
}

export class AddBook implements Action {
  readonly type = BooksActionTypes.AddBook;
  constructor(public payload: Book) { }
}

export class BookAdded implements Action {
  readonly type = BooksActionTypes.BookAdded;
  constructor(public payload: Book) { }
}

export class UpdateBook implements Action {
  readonly type = BooksActionTypes.UpdateBook;
  constructor(public payload: Book) { }
}

export class BookUpdated implements Action {
  readonly type = BooksActionTypes.BookUpdated;
  constructor(public payload: Book) { }
}

export class DeleteBook implements Action {
  readonly type = BooksActionTypes.DeleteBook;
  constructor(public payload: Book) { }
}

export class BookDeleted implements Action {
  readonly type = BooksActionTypes.BookDeleted;
  constructor(public payload: Book) { }
}

export class LoadBooksError implements Action {
  readonly type = BooksActionTypes.LoadBooksError;
  constructor(public payload: any) { }
}

export class AddBookError implements Action {
  readonly type = BooksActionTypes.AddBookError;
  constructor(public payload: any) { }
}

export class UpdateBookError implements Action {
  readonly type = BooksActionTypes.UpdateBookError;
  constructor(public payload: any) { }
}

export class DeleteBookError implements Action {
  readonly type = BooksActionTypes.DeleteBookError;
  constructor(public payload: any) { }
}

export class StopEdit implements Action {
  readonly type = BooksActionTypes.StopEdit;
}

export class StartEdit implements Action {
  readonly type = BooksActionTypes.StartEdit;
}

export type BooksActions = LoadBooks | 
BooksLoaded | 
BookSelected | 
AddBook | 
BookAdded | 
UpdateBook | 
BookUpdated | 
DeleteBook | 
BookDeleted |
LoadBooksError |
AddBookError | 
UpdateBookError |
DeleteBookError |
StartEdit |
StopEdit;
