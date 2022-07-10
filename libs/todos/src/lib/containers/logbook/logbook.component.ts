import { Component, OnDestroy, OnInit } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { combineLatest, map, Observable } from 'rxjs'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css'],
})
export class LogbookComponent implements OnInit, OnDestroy {
  showEmptyState$: Observable<boolean> = combineLatest({
    todosLoaded: this.todosFacade.todosLoaded$,
    doneTodos: this.todosFacade.doneTodos$,
  }).pipe(
    map(({ todosLoaded, doneTodos }) => todosLoaded && doneTodos.length === 0)
  )

  constructor(
    protected todosFacade: TodosFacadeService,
    private uiState: TodosMainUiStateService
  ) {}

  ngOnInit(): void {
    this.uiState.logbookOpened(true)
  }

  ngOnDestroy(): void {
    this.uiState.logbookOpened(false)
  }
}
