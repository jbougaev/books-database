import { Component, Directive, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

@Directive({
  selector: '.a-tooltip-container'
})
export class TooltipContainerDirective {
}

@Component({
  template: `
    <div class='a-tooltip-container'  [ngStyle]="{top: top, left: left}">
     <div class='a-tooltip'>
       <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tooltip.scss']
})
export class TooltipComponent implements OnInit {
  top : string;
  left: string;
  @ViewChild(TooltipContainerDirective, { read: ElementRef }) 
  private tooltipContainer;

  constructor( @Inject('tooltipDirective') private tdir ) {
  }

  ngOnInit() {
   // const {top, left, width} = this.tdir.host.getBoundingClientRect();
    const {height} = this.tooltipContainer.nativeElement.getBoundingClientRect();
    this.top = `${-height-5}px`; // `${top - height-10}px`;
    this.left = "0";
  }
}
