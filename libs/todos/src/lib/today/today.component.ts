import { Component, OnDestroy, OnInit } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { Subject, takeUntil } from 'rxjs'
import { TodosMainUiStateService } from '../todos-main/todos-main-ui-state.service'

@Component({
  selector: 'parts-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit, OnDestroy {
  addingNew$ = this.uiState.state.select('addingNew')

  private destroy$ = new Subject<void>()

  constructor(
    private uiState: TodosMainUiStateService,
    public todosFacade: TodosFacadeService
  ) {}

  ngOnInit(): void {
    this.requestTodos()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private requestTodos() {
    this.todosFacade.getTodos().pipe(takeUntil(this.destroy$)).subscribe()
  }
}
