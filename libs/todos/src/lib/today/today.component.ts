import { Component, OnDestroy, OnInit } from '@angular/core'
import { CreateTodoDto, TodosFacadeService } from '@parts/todos/data'
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

  private destroy$ = new Subject<void>()

  constructor(
    private state: RxState<TodosMainComponentState>,
    public todosFacade: TodosFacadeService
  ) {}

  ngOnInit(): void {
    this.requestTodos()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  createTodo(createTodoDto: CreateTodoDto) {
    this.disableAddingNew()

    this.todosFacade
      .createTodo(createTodoDto)
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  private requestTodos() {
    this.todosFacade.getTodos().pipe(takeUntil(this.destroy$)).subscribe()
  }

  private disableAddingNew() {
    this.state.set({
      addingNew: false,
    })
  }
}
