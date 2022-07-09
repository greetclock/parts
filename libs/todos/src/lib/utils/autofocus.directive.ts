import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core'

@Directive({
  selector: '[partsAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  private enableAutofocus = true

  @Input() set partsAutofocus(enableAutofocus: boolean) {
    this.enableAutofocus = enableAutofocus
  }

  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    if (this.enableAutofocus) {
      this.host.nativeElement.focus()
    }
  }
}
