import { Component, Input, OnInit } from '@angular/core'
import { Todo, TodosFacadeService } from '@parts/todos/data'

@Component({
  selector: 'parts-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css'],
})
export class TodoEntryComponent implements OnInit {
  @Input() todo!: Todo

  constructor(private todosFacade: TodosFacadeService) {}

  ngOnInit(): void {
    this.validateInputs()
  }

  checked(isChecked: boolean) {
    this.todosFacade.updateTodoStatus(
      this.todo.uuid,
      this.getTodoStatus(isChecked)
    )
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
