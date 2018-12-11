import { Component, OnInit } from '@angular/core';
import { Book } from '../../store';
import { BooksService } from "../books.service";
import { filter, map} from "rxjs/operators";
@Component({
  selector: 'app-audio',
  template: `
      <div class="books-container">
      <div>
        <app-books-list [books]="books"
                        (deleted)="deleteBook($event)">
        </app-books-list>
      </div>
    </div>
  `,
  styleUrls: ['./audio.component.scss']
})
export class AudioBooksComponent implements OnInit {
  books: Book[];

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.booksService.books$
      .pipe(map(books => books.filter(b=> b.isAudio === true)))
      .subscribe(books =>
        this.books = books);
  }

  deleteBook(book: Book) {
    this.booksService.deleteBook(book);
  }
}
