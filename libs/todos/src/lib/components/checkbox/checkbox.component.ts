import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'parts-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
  @Input() isChecked!: boolean
  @Input() enable = true

  @Output() checked = new EventEmitter<boolean>()

  ngOnInit(): void {
    this.validateInputs()
  }

  private validateInputs() {
    if (this.isChecked === undefined || this.isChecked === null) {
      throw new Error('CheckboxComponent: [isChecked] must be specified')
    }
  }
}
