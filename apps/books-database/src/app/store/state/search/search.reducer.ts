import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../../models/books/book.model';
import {SearchActionTypes, SearchActions } from './search.actions';

export interface SearchState extends EntityState<Book>{
  query: string | null;
}
export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();
export const initialState: SearchState = adapter.getInitialState({
  query: null
});

export function SearchReducer(state = initialState, action: SearchActions): SearchState {
  switch (action.type) {
    case SearchActionTypes.LoadSearch: {
      return {...state, query: action.payload};
    }
    case SearchActionTypes.SearchLoaded: {
      return adapter.addAll(action.payload, {...state, query: state.query});
    }
    
    default:
      return state;
  }
}

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectSearchedBookIds = selectIds;
export const selectSearchedBookEntities = selectEntities;
export const selectAllSearchedBooks = selectAll;
