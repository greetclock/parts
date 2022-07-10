import { Component } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { combineLatest, map, Observable } from 'rxjs'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent {
  addingNew$ = this.uiState.state.select('addingNew')

  showCallToAction$: Observable<boolean> = combineLatest({
    todosNumber: this.todosFacade.todosNumber$,
    todosLoaded: this.todosFacade.todosLoaded$,
    addingNew: this.addingNew$,
  }).pipe(
    map(
      ({ todosNumber, addingNew, todosLoaded }) =>
        todosNumber === 0 && !addingNew && todosLoaded
    )
  )

  constructor(
    private uiState: TodosMainUiStateService,
    protected todosFacade: TodosFacadeService
  ) {}
}
