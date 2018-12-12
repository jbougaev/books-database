import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from "@angular/router";
import { UtilitiesService } from "../../services/utilities.service";
import { Book } from '../../store';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent{
  @Input() books: Book[];
  @Input() title: string;
  @Input() readonly = false;
  @Input() parent: string;
  @Output() deleted = new EventEmitter();

  tooltipOptions: {'placement': string, 'show-delay': number,'hide-delay': number, 'theme' : string} = {
    'placement': 'top',
    'show-delay': 0,
    'hide-delay': 0,
    'theme': 'light'
  }

  constructor(private router: Router, private utilities: UtilitiesService) {}
  prepareListState() {
    return this.books ? this.books.length : 'pending';
  }

  deleteBook(book: Book) {
    this.deleted.emit(book);
  }

  navigateToDetails(book: Book) {
    const adjustedBook = this.utilities.getAuthorAndTitle(book);
    this.router.navigate(['/books', adjustedBook.author, adjustedBook.title]);
  }
}
