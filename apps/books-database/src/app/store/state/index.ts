import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooks from './books/books.reducer';
import * as fromGenre from './genre/genre.reducer';
import * as fromLanguage from './language/language.reducer';
import * as fromSearch from './search/search.reducer';
import * as fromAuth from './auth/auth.reducer';
import { Book } from '../models/books/book.model';
import {UtilitiesService} from "../../services/utilities.service";

import { BooksEffects } from './books/books.effects';
import { SearchEffects } from './search/search.effects';
import { GenresEffects } from './genre/genre.effects';
import { LanguageEffects } from './language/language.effects';
import { AuthEffects } from './auth/auth.effects';

export interface AppState {
  books: fromBooks.BooksState,
  search: fromSearch.SearchState,
  genres: fromGenre.GenreState,
  languages: fromLanguage.LanguageState,
  auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  books: fromBooks.BooksReducer,
  search: fromSearch.SearchReducer,
  genres: fromGenre.GenreReducer,
  languages: fromLanguage.LanguageReducer,
  auth: fromAuth.authReducer

};

export const effects =[
  BooksEffects, SearchEffects,LanguageEffects,GenresEffects, AuthEffects
]

// -------------------------------------------------------------------
// Auth SELECTORS
// -------------------------------------------------------------------
export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getAuthenticated = createSelector(selectAuthState, fromAuth.getAuthenticated);
export const getToken = createSelector(selectAuthState, fromAuth.getToken);
// -------------------------------------------------------------------
// BookS SELECTORS
// -------------------------------------------------------------------
export const selectBooksState = createFeatureSelector<fromBooks.BooksState>('books');

export const getBooksLoaded = createSelector(selectBooksState, fromBooks.getLoaded);

export const inEditMode = createSelector(selectBooksState, fromBooks.inEditMode);

export const selectBookIds = createSelector(
  selectBooksState,
  fromBooks.selectBookIds
);
export const selectBookEntities = createSelector(
  selectBooksState,
  fromBooks.selectBookEntities
);
export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAllBooks
);
export const selectCurrentBookId = createSelector(
  selectBooksState,
  fromBooks.getSelectedBookId
);

const emptyBook: Book = {
  id: '',
  author: '',
  country: '',
  imageLink: '/images/no_image_thumb.gif',
  language: '',
  link: '',
  pages: undefined,
  title: '',
  year: '',
  isPopular: false,
  isAudio: false,
  genre: ''
}

export const selectCurrentBook = createSelector(
  selectBookEntities,
  selectCurrentBookId,
  (bookEntities, bookId) => {
    return bookId ? bookEntities[bookId] : emptyBook;
  }
);

export const selectBookByAuthorAndTitle = createSelector(
  selectAllBooks,
  (books, props) => {
    let util = new UtilitiesService();
    return books.find(book => {
      const adjustedBook = util.getAuthorAndTitle(book);
      return adjustedBook.title === props.title && adjustedBook.author === props.author;
    });
  }
);

// -------------------------------------------------------------------
// Search SELECTORS
// -------------------------------------------------------------------
export const selectSearchState = createFeatureSelector<fromSearch.SearchState>('search');

export const selectSearchedBookIds = createSelector(
  selectSearchState,
  fromSearch.selectSearchedBookIds
);
export const selectSearchedBookEntities = createSelector(
  selectSearchState,
  fromSearch.selectSearchedBookEntities
);
export const selectAllSearchedBooks = createSelector(
  selectSearchState,
  fromSearch.selectAllSearchedBooks
);

// -------------------------------------------------------------------
// Genre SELECTORS
// -------------------------------------------------------------------
export const selectGenreState = createFeatureSelector<fromGenre.GenreState>('genres');

export const selectSearchedGenreIds = createSelector(
  selectGenreState,
  fromGenre.selectGenresIds
);
export const selectGenreEntities = createSelector(
  selectGenreState,
  fromGenre.selectGenresEntities
);
export const selectAllGenres = createSelector(
  selectGenreState,
  fromGenre.selectAllGenres
);

// -------------------------------------------------------------------
// Language SELECTORS
// -------------------------------------------------------------------
export const selectLanguageState = createFeatureSelector<fromLanguage.LanguageState>('languages');

export const selectSearchedLanguagesIds = createSelector(
  selectLanguageState,
  fromLanguage.selectLanguagesIds
);
export const selectLanguagesEntities = createSelector(
  selectLanguageState,
  fromLanguage.selectLanguagesEntities
);
export const selectAllLanguages = createSelector(
  selectLanguageState,
  fromLanguage.selectAllLanguages
);




