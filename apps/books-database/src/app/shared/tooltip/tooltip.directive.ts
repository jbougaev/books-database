import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  ReflectiveInjector,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[app-tooltip]'
})
export class TooltipDirective {

  @Input('app-tooltip') content: any;

  private componentRef: ComponentRef<TooltipComponent>;

  constructor(private element: ElementRef,
    private renderer: Renderer2,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) {
  }

  @HostListener('mouseenter') mouseenter() {

    if (this.componentRef)
      return;

    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'tooltipDirective',
        useValue: {
          host: this.element.nativeElement
        }
      }
    ]);

    this.componentRef = this.viewContainerRef.createComponent(this.resolver.resolveComponentFactory(TooltipComponent), 0, injector, this.getContent());
  }

  getContent() {

    if (typeof this.content === 'string') {
      return [[this.renderer.createText(this.content)]];
    }

    if (this.content instanceof TemplateRef) {
      return [this.content.createEmbeddedView({}).rootNodes];
    }

    const factory = this.resolver.resolveComponentFactory(this.content);
    const viewRef = factory.create(this.injector);
    return [[viewRef.location.nativeElement]];
  }

  @HostListener('mouseout') mouseout() {
    this.destroy();
  }

  destroy() {
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }

  ngOnDestroy() {
    this.destroy();
  }

}
