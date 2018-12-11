import { Action } from '@ngrx/store';
import { Book } from '../../models/books/book.model';

export enum SearchActionTypes {
  LoadSearch = '[Search] Load Success',
  SearchLoaded = '[Search] Search Loaded',
  LoadSearchError = '[Error] Load Search Error',
}

export class SearchLoaded implements Action {
  readonly type = SearchActionTypes.SearchLoaded;
  constructor(public payload: Book[]) { }
}

export class LoadSearch implements Action {
  readonly type = SearchActionTypes.LoadSearch;
  constructor(public payload: string) { }
}

export class LoadSearchError implements Action {
  readonly type = SearchActionTypes.LoadSearchError;
  constructor(public payload: any) { }
}


export type SearchActions = SearchLoaded | LoadSearch | LoadSearchError;
