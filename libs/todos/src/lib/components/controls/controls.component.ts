import { Component } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
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

  disableAddButton$: Observable<boolean> =
    this.uiState.state.select('logbookOpened')

  showControls$: Observable<boolean> = this.uiState.state.select('showControls')

  constructor(
    private uiState: TodosMainUiStateService,
    private todosFacade: TodosFacadeService
  ) {}

  addNew() {
    this.uiState.setAddingNew(true)
  }

  onDelete() {
    const expandedEntry = this.uiState.state.get('expandedEntry')

    if (expandedEntry) {
      this.todosFacade.deleteTodo(expandedEntry)
    }

    this.uiState.collapseAll()
  }
}
