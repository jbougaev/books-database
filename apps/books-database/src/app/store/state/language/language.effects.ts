import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError} from 'rxjs/operators';
import { Language } from '../../models/language/language.model';
import { LanguageService } from '../../models/language/language.service';
import * as LanguageActions from './language.actions';
import {of} from 'rxjs';

@Injectable()
export class LanguageEffects {
  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) { }

  @Effect()
  loadLanguage$ = this.actions$
    .pipe(
      ofType(LanguageActions.LanguagesActionTypes.LoadLanguages),
      switchMap(() =>
        this.languageService
          .all()
          .pipe(
            map((lang: Language[]) => new LanguageActions.LanguagesLoaded(lang)),
            catchError((error: any) => of(new LanguageActions.LoadLanguagesError(error)))
          )));
}
