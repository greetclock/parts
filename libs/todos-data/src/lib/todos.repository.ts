import { Injectable } from '@angular/core'
import { createStore, withProps } from '@ngneat/elf'
import {
  addEntities,
  deleteEntities,
  getEntity,
  selectAllEntities,
  setEntities,
  updateEntities,
  updateEntitiesIds,
  withEntities,
} from '@ngneat/elf-entities'
import { withRequestsCache, withRequestsStatus } from '@ngneat/elf-requests'
import { Todo } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TodosProps {}

export const store = createStore(
  { name: 'todos' },
  withProps<TodosProps>({}),
  withEntities<Todo, 'uuid'>({ idKey: 'uuid' }),
  withRequestsCache<'todos'>(),
  withRequestsStatus<'todos'>()
)

export const todos$ = store.pipe(selectAllEntities())

@Injectable({ providedIn: 'root' })
export class TodosRepository {
  setTodos(todos: Todo[]) {
    store.update(setEntities(todos))
  }

  addTodo(todo: Todo) {
    store.update(addEntities(todo))
  }

  updateTodo(uuid: Todo['uuid'], todo: Partial<Todo>) {
    store.update(updateEntities(uuid, todo))
  }

  updateTodoUuid(oldUuid: Todo['uuid'], newUuid: Todo['uuid']) {
    store.update(updateEntitiesIds(oldUuid, newUuid))
  }

  deleteTodo(uuid: Todo['uuid']) {
    store.update(deleteEntities(uuid))
  }

  queryTodo(uuid: Todo['uuid']): Todo | null {
    return store.query(getEntity(uuid)) ?? null
  }
}
