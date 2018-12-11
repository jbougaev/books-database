import { Directive, 
  OnInit, 
  Input, 
  ElementRef, 
  Renderer } from '@angular/core';

@Directive({
  selector: '[isFocus]'
})
export class FocusDirective implements OnInit {

  @Input() isFocus: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    if (this.isFocus) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
  }
}
