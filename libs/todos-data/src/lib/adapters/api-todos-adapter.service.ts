import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { CreateTodoDto, TodosAdapterService } from '../todos-adapter.service'
import { Todo } from '../types'

@Injectable()
export class ApiTodosAdapterService extends TodosAdapterService {
  private functionsUrl = 'https://greetclock-parts-functions.deno.dev'
  // private functionsUrl = 'http://localhost:8000'

  constructor(private http: HttpClient) {
    super()
  }

  createTodo(createTodo: CreateTodoDto): Observable<Todo> {
    return this.http.post<Todo>(`${this.functionsUrl}/todos`, createTodo)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteTodo(uuid: string): Observable<void> {
    return throwError('Not Implemented')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTodoByUuid(uuid: string): Observable<Todo | null> {
    return throwError('Not Implemented')
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.functionsUrl}/todos`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTodo(todo: Todo): Observable<Todo> {
    return throwError('Not Implemented')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTodoStatus(uuid: string, status: 'pending' | 'done'): Observable<Todo> {
    return throwError('Not Implemented')
  }
}
