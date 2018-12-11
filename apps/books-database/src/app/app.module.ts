import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PrimaryMenuComponent } from "./navigation/primary-menu/primary-menu.component";
import { BreadcrumbsComponent } from "./navigation/breadcrumbs/breadcrumbs.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { EditableTextInputComponent } from "./shared/editable-text-input/editable-text-input.component";
import { FocusDirective } from "./shared/focus-element/focus.directive";
import { SearchComponent } from "./shared/search/search.component";
import { TooltipComponent, TooltipContainerDirective } from "./shared/tooltip/tooltip.component";
import { TooltipDirective } from "./shared/tooltip/tooltip.directive";
import { AudioBooksComponent } from "./books/audio/audio.component";
import { BookDetailsComponent } from "./books/book-details/book-details.component";
import { BooksListComponent } from "./books/books-list/books-list.component";
import { BooksComponent } from "./books/books.component";
import { PaperComponent } from "./books/paper/paper.component";
import { PopularBooksComponent } from "./books/popular/popular.component";
import { SearchResultComponent } from "./books/search-result/search-result.component";
import { AppRoutingModule } from './app-routing.module';
import { BooksService } from "./books/books.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { NotFoundPageComponent } from './shared/no-found-page.component';
import { reducers, effects } from "./store/state/index";
import { EffectsModule } from "@ngrx/effects";
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [AppComponent,
    PrimaryMenuComponent,
    BreadcrumbsComponent,
    NavigationComponent,
    EditableTextInputComponent,
    FocusDirective,
    SearchComponent,
    TooltipComponent,
    AudioBooksComponent,
    BookDetailsComponent,
    BooksListComponent,
    BooksComponent,
    PaperComponent,
    PopularBooksComponent,
    SearchResultComponent,
    TooltipDirective,
    TooltipContainerDirective,
    NotFoundPageComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects)],
  providers: [BooksService,   {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  entryComponents: [TooltipComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }



