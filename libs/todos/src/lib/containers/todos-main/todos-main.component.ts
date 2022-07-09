import { Component, OnDestroy, OnInit } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { Subject, takeUntil } from 'rxjs'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'

@Component({
  selector: 'parts-todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css'],
  providers: [TodosMainUiStateService, RxState],
})
export class TodosMainComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()

  constructor(
    public todosFacade: TodosFacadeService,
    protected state: TodosMainUiStateService
  ) {}

  ngOnInit(): void {
    this.requestTodos()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  openSidebar() {
    console.log('openSidebar')
  }

  private requestTodos() {
    this.todosFacade.getTodos().pipe(takeUntil(this.destroy$)).subscribe()
  }
}
