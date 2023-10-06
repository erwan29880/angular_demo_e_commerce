import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * changement de couleur des cards au survol souris
 */

@Directive({
  selector: '[appHighlightCard]'
})
export class HighlightCardDirective {

  constructor(private el: ElementRef) { 
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setColor("#F2F2F2");
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setColor("white");
  }

  setColor(color: string) : void {
    this.el.nativeElement.style.backgroundColor = `${color}`;
  }
}
