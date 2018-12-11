import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError} from 'rxjs/operators';
import { Genre } from '../../models/genre/genre.model';
import { GenreService } from '../../models/genre/genre.service';
import * as GenreActions from './genre.actions';
import {of} from 'rxjs';

@Injectable()
export class GenresEffects {
  constructor(private actions$: Actions, private genreService: GenreService) { }

  @Effect()
  loadGenre$ = this.actions$
    .pipe(
      ofType(GenreActions.GenresActionTypes.LoadGenres),
      switchMap(() =>
        this.genreService
          .all()
          .pipe(
            map((res: Genre[]) => new GenreActions.GenresLoaded(res)),
            catchError((error: any) => of(new GenreActions.LoadGenresError(error)))
          )));
}