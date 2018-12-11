import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as LanguageActions from './language.actions';
import { LanguageState } from './language.reducer';
import * as Selectors from "../index";


@Injectable({
  providedIn: 'root'
})
export class LanguageFacade {
  allLanguages$ = this.store.pipe(select(Selectors.selectAllLanguages));
 
  constructor(private store: Store<LanguageState>) {}

  loadLanguages() {
    this.store.dispatch(new LanguageActions.LoadLanguages());
  }

}
