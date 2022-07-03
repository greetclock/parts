import { Injectable } from '@angular/core'
import { catchError, Observable, tap, throwError } from 'rxjs'
import { v4 as getUuid } from 'uuid'
import { CreateTodoDto, TodosAdapterService } from './todos-adapter.service'
import { TodosRepository } from './todos.repository'
import { Todo } from './types'

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {
  constructor(
    private todosAdapter: TodosAdapterService,
    private todosRepo: TodosRepository
  ) {}

  getTodos(): Observable<Todo[]> {
    return this.todosAdapter
      .getTodos()
      .pipe(tap((todos) => this.todosRepo.setTodos(todos)))
  }

  createTodo(todo: CreateTodoDto): Observable<Todo> {
    const tempUuid = getUuid()
    this.todosRepo.addTodo({
      uuid: tempUuid,
      ...todo,
    })

    return this.todosAdapter.createTodo(todo).pipe(
      tap((todo) => {
        this.todosRepo.updateTodoUuid(tempUuid, todo.uuid)
        this.todosRepo.updateTodo(todo.uuid, todo)
      }),
      catchError((error) => {
        this.todosRepo.deleteTodo(tempUuid)
        return throwError(() => error)
      })
    )
  }
}
