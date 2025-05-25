import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCaptureHtml]',
  standalone: true,
  exportAs: 'captureHtml',
})
export class CaptureHtmlDirective {

  constructor(private el: ElementRef) { }

  getHtml(): string {
    return this.el.nativeElement.outerHTML;
  }

}
