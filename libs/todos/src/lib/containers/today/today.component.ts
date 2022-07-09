import { Component } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent {
  addingNew$ = this.uiState.state.select('addingNew')

  constructor(
    private uiState: TodosMainUiStateService,
    protected todosFacade: TodosFacadeService
  ) {}
}
