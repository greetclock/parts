import { Component, Input, OnInit } from '@angular/core'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import { map, Observable } from 'rxjs'
import { TodosMainUiStateService } from '../todos-main/todos-main-ui-state.service'

@Component({
  selector: 'parts-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css'],
})
export class TodoEntryComponent implements OnInit {
  @Input() todo!: Todo

  isExpanded$: Observable<boolean> = this.uiState.state
    .select('expandedEntry')
    .pipe(map((expandedUuid) => this.todo.uuid === expandedUuid))

  isCollapsed$ = this.isExpanded$.pipe(map((it) => !it))

  constructor(
    private todosFacade: TodosFacadeService,
    private uiState: TodosMainUiStateService
  ) {}

  ngOnInit(): void {
    this.validateInputs()
  }

  checked(isChecked: boolean) {
    this.todosFacade.updateTodoStatus(
      this.todo.uuid,
      this.getTodoStatus(isChecked)
    )
  }

  save() {
    console.log('save')
  }

  expand() {
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
}
