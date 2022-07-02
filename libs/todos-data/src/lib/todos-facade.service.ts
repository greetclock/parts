import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { Todo } from './types'

@Injectable({
  providedIn: 'root',
})
export class TodosFacadeService {
  getTodos(): Observable<Todo[]> {
    return throwError('TodosFacadeService.getTodos(): not implemented yet')
  }

  createTodo(): Observable<Todo> {
    return throwError('TodosFacadeService.createTodo(): not implemented yet')
  }

  deleteTodo(): Observable<Todo> {
    return throwError('TodosFacadeService.deleteTodo(): not implemented yet')
  }

  updateTodo(): Observable<Todo> {
    return throwError('TodosFacadeService.updateTodo(): not implemented yet')
  }
}
