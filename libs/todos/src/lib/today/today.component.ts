import { Component, OnDestroy, OnInit } from '@angular/core'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { Subject, takeUntil } from 'rxjs'
import { TodosMainComponentState } from '../todos-main/todos-main.component'

@Component({
  selector: 'parts-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent implements OnInit, OnDestroy {
  addingNew$ = this.state.select('addingNew')

  todos: Todo[] = []

  private destroy$ = new Subject<void>()

  constructor(
    private state: RxState<TodosMainComponentState>,
    private todosFacade: TodosFacadeService
  ) {}

  ngOnInit(): void {
    this.watchTodos()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private watchTodos() {
    this.todosFacade
      .getTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((todos) => (this.todos = todos))
  }
}
