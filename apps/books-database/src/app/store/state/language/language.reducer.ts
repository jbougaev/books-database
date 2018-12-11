import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Language } from '../../models/language/language.model';
import { LanguagesActionTypes, LanguagesActions } from './language.actions';

export interface LanguageState extends EntityState<Language> {
  isLoaded: boolean;
}

export const adapter: EntityAdapter<Language> = createEntityAdapter<Language>();
export const initialState: LanguageState = adapter.getInitialState({
  isLoaded: false,
});

export function LanguageReducer(
  state = initialState,
  action: LanguagesActions
): LanguageState {
  switch (action.type) {
  
    case LanguagesActionTypes.LanguagesLoaded: {
      return adapter.addAll(action.payload, {...state, isLoaded: true});
    }
    default:
      return state;
  }
}

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectLanguagesIds = selectIds;
export const selectLanguagesEntities = selectEntities;
export const selectAllLanguages = selectAll;
