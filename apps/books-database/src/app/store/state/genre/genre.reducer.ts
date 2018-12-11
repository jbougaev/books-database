import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Genre } from '../../models/genre/genre.model';
import { GenresActionTypes, GenreActions } from './genre.actions';

export interface GenreState extends EntityState<Genre> {
  isLoaded: boolean;
}

export const adapter: EntityAdapter<Genre> = createEntityAdapter<Genre>();
export const initialState: GenreState = adapter.getInitialState({
  isLoaded: false,
});

export function GenreReducer(
  state = initialState,
  action: GenreActions
): GenreState {
  switch (action.type) {
  
    case GenresActionTypes.GenresLoaded: {
      return adapter.addAll(action.payload, {...state, isLoaded: true});
    }
    default:
      return state;
  }
}

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectGenresIds = selectIds;
export const selectGenresEntities = selectEntities;
export const selectAllGenres = selectAll;
