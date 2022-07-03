import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
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
    return this.todosAdapter
      .createTodo(todo)
      .pipe(tap((todo) => this.todosRepo.addTodo(todo)))
  }
}
