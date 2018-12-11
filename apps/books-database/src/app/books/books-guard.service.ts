import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Book, BooksFacade } from '../store';
import { switchMap, map, filter, take } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class BookFoundGuard implements CanActivate {

  constructor(private router: Router, private booksFacade: BooksFacade) { }

  isBooksLoaded(): Observable<boolean> {
    this.booksFacade.loadBooks();
    return this.booksFacade.isLoaded$
      .pipe(
        filter(loaded =>loaded),
        take(1));
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isBooksLoaded()
      .pipe(
        switchMap(() => {
          this.booksFacade.selectBookByAuthorAndTitle(route.params['author'].toLowerCase(), route.params['title'].toLowerCase());
          return this.booksFacade.selectedBookByAuthorAndTitle$.pipe(
            map((book: Book) => {
              if (!book) {
                this.router.navigate(['/']); //todo rewrite
              }
              return !!book;
            }));

        }));
  }
}