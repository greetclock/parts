import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CreateTodo, TodosAdapterService } from './todos-adapter.service'
import { Todo } from './types'

@Injectable({
  providedIn: 'root',
})
export class TodosFacadeService {
  constructor(private todosAdapter: TodosAdapterService) {}

  getTodos(): Observable<Todo[]> {
    return this.todosAdapter.getTodos()
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
