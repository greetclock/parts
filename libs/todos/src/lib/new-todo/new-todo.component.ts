import { Component } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { TodosMainUiStateService } from '../todos-main/todos-main-ui-state.service'
import { ViewTodo } from '../view-todo-entry/view-todo-entry.component'

@Component({
  selector: 'parts-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css'],
})
export class NewTodoComponent {
  protected emptyTodo: ViewTodo = {
    title: '',
    status: 'pending',
  }

  constructor(
    private uiState: TodosMainUiStateService,
    private todosFacade: TodosFacadeService
  ) {}

  onSave(todo: ViewTodo) {
    this.uiState.setAddingNew(false)
    this.todosFacade.createTodo(todo)
  }
}
