import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as GenreActions from './genre.actions';
import { GenreState } from './genre.reducer';
import * as Selectors from "../index";

@Injectable({
  providedIn: 'root'
})
export class GenreFacade {
  allGenres$ = this.store.pipe(select(Selectors.selectAllGenres));

  constructor(private store: Store<GenreState> ) {}

  loadGenres() {
    this.store.dispatch(new GenreActions.LoadGenres());
  }

}
