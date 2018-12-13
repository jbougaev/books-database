import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError} from 'rxjs/operators';
import { Book } from '../../models/books/book.model';
import { BooksService } from '../../models/books/books.service';
import * as SearchActions from './search.actions';
import {of} from 'rxjs';

@Injectable()
export class SearchEffects {

  constructor(private actions$: Actions, private booksService: BooksService) { }

  @Effect()
  searchResult$ = this.actions$.pipe(
    ofType(SearchActions.SearchActionTypes.LoadSearch),
    map((action: SearchActions.LoadSearch) => action.payload),
    switchMap((query: string) => {
      let test = query;
      return this.booksService
        .all()
        .pipe(
          map((res: Book[]) => {
            let query = test.toLowerCase();
            return new SearchActions.SearchLoaded(res.filter(r =>
              (r.author && r.author.toLowerCase().indexOf(query)) > -1 || (r.title && r.title.toLowerCase().indexOf(query) > -1))
          }),
          catchError((error: any) => of(new SearchActions.LoadSearchError(error)))
        )
    }
    ));

}
