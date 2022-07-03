import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CreateTodo, TodosAdapterService } from './todos-adapter.service'
import { TodosDataService } from './todos-data.service'
import { todos$ } from './todos.repository'
import { Todo } from './types'

@Injectable({
  providedIn: 'root',
})
export class TodosFacadeService {
  todos$ = todos$

  constructor(
    private todosAdapter: TodosAdapterService,
    private todosData: TodosDataService
  ) {}

  getTodos(): Observable<Todo[]> {
    return this.todosData.getTodos()
  }

  getTodoByUuid(uuid: string): Observable<Todo | null> {
    return this.todosAdapter.getTodoByUuid(uuid)
  }

  createTodo(data: CreateTodo): Observable<Todo> {
    return this.todosAdapter.createTodo(data)
  }

  deleteTodo(uuid: string): Observable<void> {
    return this.todosAdapter.deleteTodo(uuid)
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.todosAdapter.updateTodo(todo)
  }
}
