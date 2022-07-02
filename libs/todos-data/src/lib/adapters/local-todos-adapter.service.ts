import { Injectable } from '@angular/core'
import { delay, Observable, throwError } from 'rxjs'
import { v4 as getUuid } from 'uuid'
import { CreateTodo, TodosAdapterService } from '../todos-adapter.service'
import { Todo } from '../types'

interface Data {
  todos: Todo[]
}

@Injectable()
export class LocalTodosAdapterService extends TodosAdapterService {
  createTodo(createTodo: CreateTodo): Observable<Todo> {
    return new Observable<Todo>((subscriber) => {
      const uuid = getUuid()

      const todo = {
        uuid,
        ...createTodo,
      }

      const data = this.getData()
      data.todos.push(todo)
      this.saveData(data)

      subscriber.next(todo)
      subscriber.complete()
    }).pipe(delay(500))
  }

  deleteTodo(uuid: string): Observable<void> {
    return throwError('Not implemented')
  }

  getTodoByUuid(uuid: string): Observable<Todo | null> {
    return throwError('Not implemented')
  }

  getTodos(): Observable<Todo[]> {
    return throwError('Not implemented')
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return throwError('Not implemented')
  }

  private getData(): Data {
    const data = localStorage.getItem('todos')
    if (!data) {
      return {
        todos: [],
      }
    }

    return JSON.parse(data)
  }

  private saveData(data: Data) {
    localStorage.setItem('todos', JSON.stringify(data))
  }
}
