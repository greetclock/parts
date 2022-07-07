import { Observable } from 'rxjs'
import { Todo } from './types'

export type CreateTodoDto = Omit<Todo, 'uuid' | 'status'>

export class TodoNotFoundError extends Error {}

export abstract class TodosAdapterService {
  abstract getTodos(): Observable<Todo[]>

  abstract getTodoByUuid(uuid: string): Observable<Todo | null>

  abstract createTodo(todo: CreateTodoDto): Observable<Todo>

  abstract deleteTodo(uuid: string): Observable<void>

  /**
   * @throws TodoNotFoundError
   */
  abstract updateTodo(todo: Todo): Observable<Todo>

  /**
   * @throws TodoNotFoundError
   */
  abstract updateTodoStatus(
    uuid: string,
    status: Todo['status']
  ): Observable<Todo>
}
