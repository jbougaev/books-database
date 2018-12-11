import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { SearchResultComponent } from './books/search-result/search-result.component';
import { BookDetailsComponent } from "./books/book-details/book-details.component";
import { PaperComponent } from './books/paper/paper.component';
import { PopularBooksComponent } from './books/popular/popular.component';
import { AudioBooksComponent } from './books/audio/audio.component';
import { BookFoundGuard } from './books/books-guard.service';
import { NotFoundPageComponent } from "./shared/no-found-page.component";
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'books/paper', pathMatch: 'full' },
  {
    path: 'books',
    canActivate: [AuthGuard],
    component: BooksComponent,
    data: { breadcrumb: 'books' },

    children: [
      {
        path: '',
        redirectTo: '/books/paper',
        pathMatch: 'full'
      },
      {
        path: 'paper',
        component: PaperComponent,
        data: { breadcrumb: 'paper' }
      },
      {
        path: 'favourite',
        component: PopularBooksComponent,
        data: { breadcrumb: 'favourite' }
      },
      {
        path: 'audio',
        component: AudioBooksComponent,
        data: { breadcrumb: 'audio' }
      },
      {
        path: 'search/:query',
        component: SearchResultComponent,
        data: { breadcrumb: 'search/search-query' }
      }
    ]
  },
  {
    path: 'books/:new',
    component: BookDetailsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'books/new' }
  },
  {
    path: 'books/:author/:title',
    component: BookDetailsComponent,
    canActivate: [BookFoundGuard, AuthGuard],
    data: { breadcrumb: 'books/book-details' }
  },
  {path: 'signin', 
  component: SigninComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
