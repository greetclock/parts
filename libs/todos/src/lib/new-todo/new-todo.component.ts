import { Component, OnDestroy } from '@angular/core'
import { TodosFacadeService } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { Subject, takeUntil } from 'rxjs'
import { TodosMainComponentState } from '../todos-main/todos-main.component'

@Component({
  selector: 'parts-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css'],
})
export class NewTodoComponent implements OnDestroy {
  title = ''
  description = ''

  private destroy$ = new Subject<void>()

  constructor(
    private todosFacade: TodosFacadeService,
    private state: RxState<TodosMainComponentState>
  ) {}

  save() {
    this.todosFacade
      .createTodo({
        title: this.title,
        description: this.description,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.disableAddingNew())
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private disableAddingNew() {
    this.state.set({
      addingNew: false,
    })
  }
}
