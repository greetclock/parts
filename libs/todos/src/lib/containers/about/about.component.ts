import { Component, OnDestroy, OnInit } from '@angular/core'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
  constructor(private uiState: TodosMainUiStateService) {}

  ngOnInit(): void {
    this.uiState.hideControls()
  }

  ngOnDestroy(): void {
    this.uiState.showControls()
  }
}
