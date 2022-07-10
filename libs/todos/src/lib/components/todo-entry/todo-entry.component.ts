import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import {
  first,
  map,
  merge,
  mergeMap,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs'
import { TodoCheckedTimerService } from '../../services/todo-checked-timer.service'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
import { ViewTodo } from '../view-todo-entry/view-todo-entry.component'

@Component({
  selector: 'parts-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css'],
})
export class TodoEntryComponent implements OnInit, OnDestroy {
  @Input() todo!: Todo

  protected isExpanded = false

  private destroy$ = new Subject<void>()

  private flushChecked$: Observable<void> = merge(
    this.destroy$,
    this.todoCheckedTimer.checked$
  )

  constructor(
    private todosFacade: TodosFacadeService,
    private uiState: TodosMainUiStateService,
    private todoCheckedTimer: TodoCheckedTimerService
  ) {}

  ngOnInit(): void {
    this.validateInputs()
    this.watchIsExpanded()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onChecked(isChecked: boolean) {
    this.flushChecked$
      .pipe(
        first(),
        mergeMap(() =>
          this.todosFacade.updateTodoStatus(
            this.todo.uuid,
            this.getTodoStatus(isChecked)
          )
        )
      )
      .subscribe()

    this.todoCheckedTimer.checkTodo()
  }

  onSave(todo: ViewTodo) {
    const updatedTodo: Todo = {
      ...this.todo,
      ...todo,
    }

    this.uiState.collapseEntry(updatedTodo.uuid)
    return this.todosFacade.updateTodo(updatedTodo)
  }

  onExpand() {
    this.uiState.expandEntry(this.todo.uuid)
  }

  private validateInputs() {
    if (!this.todo) {
      throw new Error('TodoEntryComponent: [todo] input must be specified.')
    }
  }

  private getTodoStatus(checked: boolean): Todo['status'] {
    return checked ? 'done' : 'pending'
  }

  private watchIsExpanded() {
    this.uiState.state
      .select('expandedEntry')
      .pipe(
        map((expandedUuid) => this.todo.uuid === expandedUuid),
        takeUntil(this.destroy$)
      )
      .subscribe((isExpanded) => (this.isExpanded = isExpanded))
  }
}
