import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import { map, Subject, takeUntil } from 'rxjs'
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
    this.todosFacade.updateTodoStatus(
      this.todo.uuid,
      this.getTodoStatus(isChecked)
    )
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
