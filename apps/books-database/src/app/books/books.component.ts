import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BooksService } from "./books.service";
import { Book, BooksFacade, SearchFacade } from '../store';
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit, OnDestroy {
  books$: Observable<Book[]> = this.booksFacade.allBooks$;
  searchResults$: Observable<Book[]> = this.searchFacade.searchResult$;
  deleteBookSibscription: Subscription;
  searchBookSubscription: Subscription;
  constructor(private booksService: BooksService, private booksFacade: BooksFacade, private searchFacade: SearchFacade) {
  }

  ngOnInit() {
    this.deleteBookSibscription = this.booksService.deleteBookE.subscribe((book: Book) => this.deleteBook(book));
    this.searchBookSubscription = this.booksService.searcheBooksE.subscribe((query: string) =>
      this.searchBooks(query));
    this.books$.subscribe((books: Book[]) => {
      this.booksService.addBooks(books);
    });

    this.booksFacade.loadBooks();
  }

  deleteBook(book: Book) {
    this.booksFacade.deleteBook(book);
  }

  searchBooks(query: string) {
    this.searchResults$.subscribe((books: Book[]) => {
      this.booksService.addSearchResults(books);
    });
    this.searchFacade.loadSearch(query);
  }

  ngOnDestroy() {
    this.deleteBookSibscription.unsubscribe();
    this.searchBookSubscription.unsubscribe();
  }
}
