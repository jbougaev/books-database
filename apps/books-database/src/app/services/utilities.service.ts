import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  public replaceAll(input: string, find: string, replace: string): string {
    return input.replace(new RegExp(find, 'g'), replace);
  }

  public getAuthorAndTitle(book){
    let author = this.replaceAll(book.author, '. ', '-');
    author = this.replaceAll(author, ' ', '-').toLowerCase();
      let title = this.replaceAll(book.title, '. ', '-');
      title = this.replaceAll(title, ' ', '-').toLowerCase();
      return {author, title};
  }

  //<pre><code>{{ getAllErrors(bookDetails) | json }}</code></pre>
  public getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrors(control)
        : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }
}
