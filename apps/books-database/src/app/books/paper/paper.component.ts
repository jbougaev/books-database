import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Book } from '../../store';
import { BooksService } from "../books.service";
import { filter, map } from "rxjs/operators";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paper',
  template: `
      <div class="books-container">
      <div>
        <app-books-list [books]="books"
                        (deleted)="deleteBook($event)">
        </app-books-list>
      </div>
    </div>
  `,
  styleUrls: ['./paper.component.scss'],
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaperComponent implements OnInit, OnDestroy {
  books: Book[];
  private booksSubscription: Subscription;

  constructor(private booksService: BooksService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.booksSubscription = this.booksService.books$
      .pipe(map(books => books.filter(b => b.isAudio === false)))
      .subscribe(books =>{
        this.books = books
        this.changeDetectorRef.markForCheck();
      }
        );
  }

  deleteBook(book: Book) {
    this.booksService.deleteBook(book);
  }

  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }
}
