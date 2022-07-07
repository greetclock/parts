import { Component } from '@angular/core'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  constructor(private uiState: TodosMainUiStateService) {}

  addNew() {
    setTimeout(() => this.uiState.setAddingNew(true))
  }
}
