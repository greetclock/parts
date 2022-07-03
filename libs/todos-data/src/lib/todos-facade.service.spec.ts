import { SpectatorService } from '@ngneat/spectator'
import { createServiceFactory, mockProvider } from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { v4 as getUuid } from 'uuid'
import { CreateTodo, TodosAdapterService } from './todos-adapter.service'
import { TodosFacadeService } from './todos-facade.service'
import { Todo } from './types'

describe('TodosFacadeService', () => {
  let todosList: Todo[]
  let todoByUuid: Todo

  const createService = createServiceFactory({
    service: TodosFacadeService,
    providers: [
      mockProvider(TodosAdapterService, {
        getTodos: mockObservable(() => todosList),
        getTodoByUuid: mockObservable(() => todoByUuid),
        createTodo: mockObservable((data: CreateTodo) => ({
          uuid: getUuid(),
          ...data,
        })),
        deleteTodo: mockObservable(() => void 0),
        updateTodo: mockObservable((todo) => todo),
      }),
    ],
  })

  let spectator: SpectatorService<TodosFacadeService>

  it('should create', () => {
    spectator = createService()
    expect(spectator.service).toBeTruthy()
  })

  describe('getTodos()', () => {
    it('should return the list from the adapter', (done) => {
      todosList = [
        {
          uuid: 'uuid1',
          title: 'Buy milk',
        },
        {
          uuid: 'uuid2',
          title: 'Code things',
        },
      ]

      spectator = createService()

      spectator.service.getTodos().subscribe((todos) => {
        expect(todos).toEqual(todosList)
        done()
      })
    })
  })

  describe('getTodoByUuid()', () => {
    it('should return todo from the adapter', (done) => {
      todoByUuid = {
        uuid: 'uuid1',
        title: 'Buy milk',
      }

      spectator = createService()
      spectator.service.getTodoByUuid('uuid1').subscribe((todo) => {
        expect(todo).toEqual(todoByUuid)
        done()
      })
    })
  })

  describe('createTodo()', () => {
    it('should create todo using the adapter', (done) => {
      spectator = createService()

      const todoDto: CreateTodo = {
        title: 'Buy milk',
      }

      spectator.service.createTodo(todoDto).subscribe((todo) => {
        expect(todo.uuid).toBeTruthy()
        expect(todo.title).toEqual(todoDto.title)
        done()
      })
    })
  })

  describe('deleteTodo()', () => {
    it('should delete todo using the adapter', (done) => {
      spectator = createService()

      spectator.service.deleteTodo('uuid1').subscribe(() => {
        expect(
          spectator.inject(TodosAdapterService).deleteTodo
        ).toHaveBeenCalledWith('uuid1')
        done()
      })
    })
  })

  describe('updateTodo()', () => {
    it('should update todo using the adapter', (done) => {
      spectator = createService()

      const todo: Todo = {
        uuid: 'uuid1',
        title: 'Buy Milk',
      }

      spectator.service.updateTodo(todo).subscribe((updatedTodo) => {
        expect(updatedTodo).toEqual(todo)
        done()
      })
    })
  })
})
