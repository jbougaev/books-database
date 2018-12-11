import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <p>Page Not Found</p>
      
        <p>It looks like this page doesn't exist yet.</p>
 
        <button  routerLink="/">Take Me Home</button>
    
    </section>
  `,
  styles: [`
    :host {
      text-align: center;
    }
  `]
})
export class NotFoundPageComponent { }