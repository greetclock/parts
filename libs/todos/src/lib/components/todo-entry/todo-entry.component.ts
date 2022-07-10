import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import {
  debounceTime,
  first,
  map,
  merge,
  mergeMap,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
import { ViewTodo } from '../view-todo-entry/view-todo-entry.component'

export const CHECKED_DELAY = 2000

@Component({
  selector: 'parts-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css'],
})
export class TodoEntryComponent implements OnInit, OnDestroy {
  @Input() todo!: Todo

  protected isExpanded = false

  private destroy$ = new Subject<void>()

  private checked$ = new Subject<void>()

  private flushChecked$: Observable<void> = merge(
    this.destroy$,
    this.checked$.pipe(debounceTime(CHECKED_DELAY))
  )

  constructor(
    private todosFacade: TodosFacadeService,
    private uiState: TodosMainUiStateService
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

    this.checked$.next()
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
