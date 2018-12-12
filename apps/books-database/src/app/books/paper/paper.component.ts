import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../store';
import { BooksService } from "../books.service";
import { filter, map } from "rxjs/operators";

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
 //changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaperComponent implements OnInit {
  books: Book[];

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.booksService.books$
      .pipe(map(books => books.filter(b => b.isAudio === false)))
      .subscribe(books =>
        this.books = books);
  }

  deleteBook(book: Book) {
    this.booksService.deleteBook(book);
  }
}
