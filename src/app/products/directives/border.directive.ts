import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * ajout border au caddie au survol de la souris
 */

@Directive({
  selector: '[appborder]'
})
export class BorderCardDirective {

  constructor(private el: ElementRef) { 
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setColor("1px solid #F2F2F2");
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setColor("none");
  }

  setColor(color: string) : void {
    this.el.nativeElement.style.border = `${color}`;
  }
}
