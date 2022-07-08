import { Component } from '@angular/core'
import { map, Observable } from 'rxjs'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent {
  enableCollapsedControls$: Observable<boolean> =
    this.uiState.isTodoExpanded$.pipe(map((it) => !it))

  enableExpandedControls$: Observable<boolean> = this.uiState.isTodoExpanded$

  constructor(private uiState: TodosMainUiStateService) {}

  addNew() {
    this.uiState.setAddingNew(true)
  }

  onDelete() {
    console.log('delete')
  }
}
