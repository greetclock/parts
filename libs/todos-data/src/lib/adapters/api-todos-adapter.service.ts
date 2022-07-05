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

  deleteTodo(uuid: string): Observable<void> {
    return throwError('Not Implemented')
  }

  getTodoByUuid(uuid: string): Observable<Todo | null> {
    return throwError('Not Implemented')
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.functionsUrl}/todos`)
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return throwError('Not Implemented')
  }
}
