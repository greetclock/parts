import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { TodosAdapterService } from './todos-adapter.service'
import { Todo } from './types'

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {
  constructor(private todosAdapter: TodosAdapterService) {}

  getTodos(): Observable<Todo[]> {
    return this.todosAdapter.getTodos()
  }
}
