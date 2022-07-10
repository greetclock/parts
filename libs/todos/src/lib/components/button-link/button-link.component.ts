import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'parts-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.css'],
})
export class ButtonLinkComponent implements OnInit {
  @Input() url!: string

  ngOnInit(): void {
    this.validateInputs()
  }

  private validateInputs() {
    if (!this.url) {
      throw new Error(`ButtonLinkComponent: [url] must be defined`)
    }
  }
}
