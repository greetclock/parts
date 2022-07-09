import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'parts-control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.css'],
})
export class ControlButtonComponent {
  @Input() disabled = false

  @Output() buttonClick = new EventEmitter<void>()

  onButtonClick(event: Event) {
    event.stopPropagation()

    this.buttonClick.next()
  }
}
