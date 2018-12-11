import { Action } from '@ngrx/store';
import { Genre } from '../../models/genre/genre.model';

export enum GenresActionTypes {
  LoadGenres = '[Genres] Load Genres',
  GenresLoaded = '[Genres] Genres Loaded',
  LoadGenresError = '[Error] Load Genres Error',
}

export class LoadGenres implements Action {
  readonly type = GenresActionTypes.LoadGenres;
  constructor() {}
}

export class GenresLoaded implements Action {
  readonly type = GenresActionTypes.GenresLoaded;
  constructor(public payload: Genre[]) {}
}

export class LoadGenresError implements Action {
  readonly type = GenresActionTypes.LoadGenresError;
  constructor(public payload: any) { }
}

export type GenreActions = LoadGenres | GenresLoaded | LoadGenresError ;
