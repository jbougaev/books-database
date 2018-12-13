import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BooksFacade, Book, GenreFacade, Genre, LanguageFacade, Language } from '../../store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, switchMap } from "rxjs/operators";
import { Observable, Subscription, Subject } from "rxjs";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  book: Book;
  private bookSubscription: Subscription;
  genresList$: Observable<Genre[]> = this.genreFacade.allGenres$;
  languagesList$: Observable<Language[]> = this.languageFacade.allLanguages$;
  bookDetailsFormGroup: FormGroup;
  inEditMode: boolean = false;
  changeChildMode: Subject<boolean> = new Subject<boolean>();

  get changeChildMode$() {
    return this.changeChildMode.asObservable();
  }

  constructor(private booksFacade: BooksFacade,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private languageFacade: LanguageFacade,
    private genreFacade: GenreFacade,
    private router: Router
  ) { }

  ngOnInit() {

    this.booksFacade.inEditMode$.subscribe((mode: boolean) => {
      this.inEditMode = mode;
    });

    this.bookDetailsFormGroup = this.formBuilder.group({
      id: [''],
      author: ['', Validators.required],
      country: ['', Validators.required],
      imageLink: [''],
      language: ['', Validators.required],
      link: [''],
      pages: ['', [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      title: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[1-9]\\d*$')]],
      genre: ['', Validators.required],
      isPopular: [''],
      isAudio: [''],
    });

    this.bookSubscription = this.route.paramMap.pipe(
      switchMap((params: Params) => {
        if (params.params['author'] && params.params['title']) {
          this.booksFacade.selectBookByAuthorAndTitle(params.params['author'].toLowerCase(),
            params.params['title'].toLowerCase());
          return this.booksFacade.selectedBookByAuthorAndTitle$
            .pipe(tap(book => {
              if (book) {
                this.bookDetailsFormGroup.patchValue(book);
              }
            }));
        } else if (params.params['new']) {
          this.booksFacade.selectBook(null);
          return this.booksFacade.selectedBook$
            .pipe(tap(book => {
              if (book) {
                this.bookDetailsFormGroup.patchValue(book);
              }
            }));
        }
      })
    ).subscribe((b: Book) => {
      this.book = b;
      if (b && !b.id) {
        this.booksFacade.startEdit();
      }
    });

    this.genreFacade.loadGenres();
    this.languageFacade.loadLanguages();

  }

  ngAfterViewInit() {
    if (this.book && !this.book.id) {
      setTimeout(() => {
        this.changeChildMode.next(true);
      }, 0);
    }
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
    this.booksFacade.stopEdit();
  }

  submit() {
    if (this.bookDetailsFormGroup.valid) {
      this.saveBook(this.bookDetailsFormGroup.value);
    }
  }

  changeEditMode(mode: boolean) {
    mode ? this.booksFacade.startEdit() : this.booksFacade.stopEdit();
  }

  saveBook(book: Book) {
    !book.id ? (this.booksFacade.addBook(book), this.router.navigate(['/'])) :
      (this.booksFacade.updateBook(book), this.router.navigate(['/']));
  }

  resetBook() {
    if (this.book.id) {
      this.bookDetailsFormGroup.reset(this.book);
      this.booksFacade.stopEdit();
      this.changeChildMode.next(false);
    } else {
      this.bookDetailsFormGroup.reset();
    }
  }
}
