import { Observable } from 'rxjs'
import { Todo } from './types'

export type CreateTodo = Omit<Todo, 'uuid'>

export abstract class TodosAdapterService {
  abstract getTodos(): Observable<Todo[]>

  abstract getTodoByUuid(uuid: string): Observable<Todo | null>

  abstract createTodo(todo: CreateTodo): Observable<Todo>

  abstract deleteTodo(uuid: string): Observable<void>

  abstract updateTodo(todo: Todo): Observable<Todo>
}
