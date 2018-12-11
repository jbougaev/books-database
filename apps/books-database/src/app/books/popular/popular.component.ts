import { Component, OnInit } from '@angular/core';
import { Book } from '../../store';
import { BooksService } from "../books.service";
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-popular',
  template: `
        <div class="carusel-container">
        <div>
          <app-books-list [books]="books" [title]="'Books'"
                          (deleted)="deleteBook($event)">
          </app-books-list>
        </div>
        <div>
          <app-books-list [books]="audio" [title]="'Audio'"
                          (deleted)="deleteBook($event)">
          </app-books-list>
        </div>
      </div>
  `,
  styleUrls: ['./popular.component.scss']
})
export class PopularBooksComponent implements OnInit {
  books: Book[];
  audio: Book[];

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.booksService.books$
      .pipe(map((books: Book[]) => books.filter(b => b.isPopular === true)))
      .subscribe((books: Book[]) => {
        this.books = books.filter(b => b.isAudio === false);
        this.audio = books.filter(b => b.isAudio === true);
        }
      );
  }

  deleteBook(book: Book) {
    this.booksService.deleteBook(book);
  }
}
