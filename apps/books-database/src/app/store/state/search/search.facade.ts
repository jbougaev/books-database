import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as SearchActions from './search.actions';
import { SearchState } from './search.reducer';
import * as Selectors from "../index";

@Injectable({
  providedIn: 'root'
})
export class SearchFacade {
  searchResult$ = this.store.pipe(select(Selectors.selectAllSearchedBooks));
  
   constructor(private store: Store<SearchState>) {}

  loadSearch(payload: string) {
    this.store.dispatch(new SearchActions.LoadSearch(payload));
  }
}
