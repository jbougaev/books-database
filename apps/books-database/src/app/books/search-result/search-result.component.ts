import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from "../books.service";
import { Book } from '../../store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-result',
  template: `
      <div class="carusel-container">
      <div class="carusel-container__title">
        <span class="bigger-font">Search Result for "{{query}}"</span>
      </div>
      <div>
        <app-books-list [books]="books" [title]="'Books'"
                        (selected)="selectBook($event)">
        </app-books-list>
      </div>
      <div>
        <app-books-list [books]="audio" [title]="'Audio'"
                        (selected)="selectBook($event)">
        </app-books-list>
      </div>
    </div>
  `,
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent implements OnInit, OnDestroy {

  books: Book[];
  audio: Book[];
  private subscription: Subscription;
  private searchResultsSubcriotion: Subscription;
  query: string;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {    
    this.subscription = this.route.params.subscribe(params => {
      this.query = params['query'];
      this.booksService.searchBooks(params['query'].toLowerCase());
    });

    this.booksService.searchResults$
      .subscribe((books: Book[]) => {
          this.books = books.filter(b => b.isAudio === false);
          this.audio = books.filter(b => b.isAudio === true);
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.searchResultsSubcriotion.unsubscribe;
  }
}
