import { fakeAsync, tick } from '@angular/core/testing'
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest'
import { v4 as getUuid } from 'uuid'
import { CreateTodoDto, TodoNotFoundError } from '../todos-adapter.service'
import { Todo } from '../types'
import {
  DELAY_MS,
  LocalStorageData,
  LocalTodosAdapterService,
} from './local-todos-adapter.service'

describe('LocalTodosAdapterService', () => {
  let spectator: SpectatorService<LocalTodosAdapterService>
  const createService = createServiceFactory({
    service: LocalTodosAdapterService,
  })

  function getData(): LocalStorageData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return JSON.parse((localStorage as any).__STORE__.todos)
  }

  function setData(data: LocalStorageData) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(localStorage as any).__STORE__.todos = JSON.stringify(data)
  }

  beforeEach(() => {
    spectator = createService()
    spectator.service.setProbilityOfFailure(0)
  })

  it('should create', () => {
    expect(spectator.service).toBeTruthy()
  })

  describe('createTodo()', () => {
    it('should create entry in the localStorage', fakeAsync(() => {
      const todo: CreateTodoDto = {
        title: 'Buy Milk',
      }

      spectator.service.createTodo(todo).subscribe()
      tick(DELAY_MS)

      const data = getData()

      expect(
        data.todos.find((it: Todo) => it.title === todo.title)
      ).toBeTruthy()
    }))
  })

  describe('getTodoByUuid()', () => {
    it('should return todo by UUID', (done) => {
      const todo: Todo = {
        uuid: getUuid(),
        title: 'Buy Milk',
        status: 'pending',
      }

      setData({
        todos: [todo],
      })

      spectator.service.getTodoByUuid(todo.uuid).subscribe((result) => {
        expect(result).toEqual(todo)
        done()
      })
    })

    it('should return null if todo does not exist', (done) => {
      spectator.service.getTodoByUuid(getUuid()).subscribe((result) => {
        expect(result).toEqual(null)
        done()
      })
    })
  })

  describe('deleteTodo()', () => {
    it('should delete todo', fakeAsync(() => {
      const todo: Todo = {
        uuid: getUuid(),
        title: 'Buy Milk',
        status: 'pending',
      }

      setData({
        todos: [todo],
      })

      spectator.service.deleteTodo(todo.uuid).subscribe()
      tick(DELAY_MS)

      expect(getData().todos.find((it) => it.uuid === todo.uuid)).toBeFalsy()
    }))
  })

  describe('getTodos()', () => {
    it('should return the list of todos', (done) => {
      const todo1: Todo = {
        uuid: getUuid(),
        title: 'Buy Milk',
        status: 'pending',
      }

      const todo2: Todo = {
        uuid: getUuid(),
        title: 'Code',
        status: 'pending',
      }

      setData({
        todos: [todo1, todo2],
      })

      spectator.service.getTodos().subscribe((todos) => {
        expect(todos).toEqual([todo1, todo2])
        done()
      })
    })
  })

  describe('updateTodo()', () => {
    it('should update todo', (done) => {
      const todo: Todo = {
        uuid: getUuid(),
        title: 'Buy Milk',
        status: 'pending',
      }

      setData({
        todos: [todo],
      })

      const updatedTodo: Todo = {
        ...todo,
        description: 'And eggs',
      }

      spectator.service.updateTodo(updatedTodo).subscribe((todo) => {
        expect(todo).toEqual(updatedTodo)
        const data = getData()
        expect(data.todos.find((it) => it.uuid === updatedTodo.uuid)).toEqual(
          updatedTodo
        )

        done()
      })
    })

    it('should throw error if todo does not exist', (done) => {
      const todo: Todo = {
        uuid: getUuid(),
        title: 'Buy Milk',
        status: 'pending',
      }

      spectator.service.updateTodo(todo).subscribe({
        error: (error) => {
          expect(error).toBeInstanceOf(TodoNotFoundError)
          done()
        },
      })
    })
  })

  describe('updateTodoStatus()', () => {
    it('should update todo status', (done) => {
      const todo: Todo = {
        uuid: getUuid(),
        title: 'Buy Milk',
        status: 'pending',
      }

      setData({
        todos: [todo],
      })

      spectator.service
        .updateTodoStatus(todo.uuid, 'done')
        .subscribe((todo) => {
          const updatedTodo: Todo = {
            ...todo,
            status: 'done',
          }

          expect(todo).toEqual(updatedTodo)

          const data = getData()
          expect(data.todos.find((it) => it.uuid === todo.uuid)).toEqual(
            updatedTodo
          )

          done()
        })
    })
  })
})
