import { Injectable } from '@angular/core'
import { delay, mergeMap, Observable, of, throwError } from 'rxjs'
import { v4 as getUuid } from 'uuid'
import {
  CreateTodoDto,
  TodoNotFoundError,
  TodosAdapterService,
} from '../todos-adapter.service'
import { Todo } from '../types'

export interface LocalStorageData {
  todos: Todo[]
}

export const DELAY_MS = 500

@Injectable()
export class LocalTodosAdapterService extends TodosAdapterService {
  private probabilityOfFailure = 0

  constructor() {
    super()

    this.enableConsoleCommands()
  }

  createTodo(createTodo: CreateTodoDto): Observable<Todo> {
    return new Observable<Todo>((subscriber) => {
      const uuid = getUuid()

      const todo: Todo = {
        uuid,
        status: 'pending',
        ...createTodo,
      }

      if (this.isResponseFailed()) {
        setTimeout(() => {
          const error = new Error('Unknown error')
          console.warn(error)
          subscriber.error(error)
        }, DELAY_MS)
      } else {
        const data = this.getData()
        data.todos.push(todo)
        this.saveData(data)

        subscriber.next(todo)
        subscriber.complete()
      }
    }).pipe(delay(DELAY_MS))
  }

  deleteTodo(uuid: string): Observable<void> {
    return new Observable((subscriber) => {
      const data = this.getData()
      data.todos = data.todos.filter((it) => it.uuid !== uuid)
      this.saveData(data)

      subscriber.next()
      subscriber.complete()
    })
  }

  getTodoByUuid(uuid: string): Observable<Todo | null> {
    return new Observable<Todo | null>((subscriber) => {
      const data = this.getData()
      const todo = data.todos.find((it) => it.uuid === uuid)

      subscriber.next(todo ?? null)
      subscriber.complete()
    }).pipe(delay(DELAY_MS))
  }

  getTodos(): Observable<Todo[]> {
    return new Observable<Todo[]>((subscriber) => {
      const data = this.getData()
      subscriber.next(data.todos)
      subscriber.complete()
    }).pipe(delay(DELAY_MS))
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return new Observable<Todo>((subscriber) => {
      try {
        this.updateTodoInStorage(todo)
      } catch (err: unknown) {
        subscriber.error(err)
        return
      }

      subscriber.next(todo)
      subscriber.complete()
    }).pipe(delay(DELAY_MS))
  }

  updateTodoStatus(uuid: string, status: 'pending' | 'done'): Observable<Todo> {
    return this.getTodoByUuid(uuid).pipe(
      mergeMap((todo) => {
        const todoNotFoundError$ = throwError(() => new TodoNotFoundError())
        if (!todo) {
          return todoNotFoundError$
        }

        todo.status = status

        try {
          this.updateTodoInStorage(todo)
          return of(todo)
        } catch (err: unknown) {
          return throwError(() => err)
        }
      })
    )
  }

  setProbilityOfFailure(probability: number) {
    this.probabilityOfFailure = probability
  }

  private updateTodoInStorage(todo: Todo) {
    const data = this.getData()

    const savedTodo = data.todos.find((it) => it.uuid === todo.uuid)
    if (!savedTodo) {
      throw new TodoNotFoundError()
    }

    const todoIndex = data.todos.indexOf(savedTodo)

    data.todos[todoIndex] = todo

    this.saveData(data)
  }

  private getData(): LocalStorageData {
    const data = localStorage.getItem('todos')
    if (!data) {
      return {
        todos: [],
      }
    }

    return JSON.parse(data)
  }

  private saveData(data: LocalStorageData) {
    localStorage.setItem('todos', JSON.stringify(data))
  }

  private enableConsoleCommands() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).clearTodos = () => {
      localStorage.removeItem('todos')
      window.location.reload()
    }
  }

  private isResponseFailed(): boolean {
    return Math.random() < this.probabilityOfFailure
  }
}
