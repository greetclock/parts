import { Component, Input, OnInit } from '@angular/core'
import { Todo } from '@parts/todos/data'

@Component({
  selector: 'parts-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.css'],
})
export class TodoEntryComponent implements OnInit {
  @Input() todo!: Todo

  ngOnInit(): void {
    this.validateInputs()
  }

  private validateInputs() {
    if (!this.todo) {
      throw new Error('TodoEntryComponent: [todo] input must be specified.')
    }
  }
}
