import { Component } from '@angular/core'
import { CreateTodoDto, TodosFacadeService } from '@parts/todos/data'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
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

  onSave(todo: CreateTodoDto) {
    this.uiState.setAddingNew(false)
    this.todosFacade.createTodo(todo)
  }
}
