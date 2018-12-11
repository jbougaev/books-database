import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../../models/books/book.model';
import { BooksActions, BooksActionTypes } from './books.actions';


export interface BooksState extends EntityState<Book> {
  isLoaded: boolean;
  selectedBookId: string | null;
  selectedBookAuthor: string | null;
  selectedBookTitle: string | null;
  inEditMode: boolean;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();
export const initialState: BooksState = adapter.getInitialState({
  isLoaded: false,
  selectedBookId: null,
  selectedBookAuthor: null,
  selectedBookTitle: null,
  inEditMode: false
});

export function BooksReducer(
  state = initialState,
  action: BooksActions
): BooksState {
  switch (action.type) {
    case BooksActionTypes.BookSelected: {
      if(action.payload && action.payload.author && action.payload.title){
        return { ...state, selectedBookAuthor: action.payload.author, selectedBookTitle: action.payload.title};
      }else{
        return { ...state, selectedBookId: action.payload };
      }
  }
    case BooksActionTypes.BooksLoaded: {
      return adapter.addAll(action.payload, { ...state, isLoaded: true });
    }
    case BooksActionTypes.BookAdded: {
      return adapter.addOne(action.payload, { ...state, inEditMode: false });
    }
    case BooksActionTypes.BookUpdated: {
      return adapter.upsertOne(action.payload, { ...state, inEditMode: false });
    }

    case BooksActionTypes.BookDeleted: {
      return adapter.removeOne(action.payload.id, { ...state, inEditMode: false });
    }

    case BooksActionTypes.StartEdit:{
      return { ...state, inEditMode: true };
    }

    case BooksActionTypes.StopEdit: {
      return { ...state, inEditMode: false };
    }
   
    default:
      return state;
  }
}

export const getLoaded = (state: BooksState) => 
state.isLoaded;

export const inEditMode = (state: BooksState) => 
state.inEditMode;

export const getSelectedBookId = (state: BooksState) => 
state.selectedBookId;

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectBookIds = selectIds;
export const selectBookEntities = selectEntities;
export const selectAllBooks = selectAll;
