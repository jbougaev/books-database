import { Action } from '@ngrx/store';
import { Language } from '../../models/language/language.model';

export enum LanguagesActionTypes {
  LoadLanguages = '[Languages] Load Languages',
  LanguagesLoaded = '[Languages] Data Languages',
  LoadLanguagesError = '[Error] Load Languages Error',
}

export class LoadLanguages implements Action {
  readonly type = LanguagesActionTypes.LoadLanguages;
  constructor() { }
}

export class LanguagesLoaded implements Action {
  readonly type = LanguagesActionTypes.LanguagesLoaded;
  constructor(public payload: Language[]) { }
}

export class LoadLanguagesError implements Action {
  readonly type = LanguagesActionTypes.LoadLanguagesError;
  constructor(public payload: any) { }
}

export type LanguagesActions = LoadLanguages | LanguagesLoaded | LoadLanguagesError;
