import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { throwError } from 'rxjs'
import { CreateTodoDto, TodosAdapterService } from './todos-adapter.service'
import { TodosDataService } from './todos-data.service'
import { TodosRepository } from './todos.repository'
import { Todo } from './types'
import { UuidGeneratorService } from './uuid-generator.service'

describe('TodosDataService', () => {
  let todos: Todo[]
  let generatedUuid: string
  let backendGeneratedUuid: string

  let spectator: SpectatorService<TodosDataService>
  const createService = createServiceFactory({
    service: TodosDataService,
    providers: [
      mockProvider(TodosAdapterService, {
        getTodos: mockObservable(() => todos),
        createTodo: mockObservable((todo) => ({
          uuid: backendGeneratedUuid,
          ...todo,
        })),
        deleteTodo: mockObservable(() => void 0),
      }),
      mockProvider(TodosRepository),
      mockProvider(UuidGeneratorService, {
        getUuid: () => generatedUuid,
      }),
    ],
  })

  beforeEach(() => {
    todos = []
    spectator = createService()
  })

  it('should create', () => {
    expect(spectator.service).toBeTruthy()
  })

  describe('getTodos()', () => {
    it('should request data from the todo adapter', () => {
      spectator.service.getTodos().subscribe()

      expect(spectator.inject(TodosAdapterService).getTodos).toHaveBeenCalled()
    })

    it('should save todos in the repo', () => {
      todos = [
        {
          uuid: '1',
          title: 'Buy Milk',
          status: 'pending',
        },
      ]

      spectator.service.getTodos().subscribe()

      expect(spectator.inject(TodosRepository).setTodos).toHaveBeenCalledWith(
        todos
      )
    })
  })

  describe('createTodo()', () => {
    it('save todo in the adapter', () => {
      const todo: CreateTodoDto = {
        title: 'Buy Milk',
      }

      spectator.service.createTodo(todo).subscribe()

      expect(
        spectator.inject(TodosAdapterService).createTodo
      ).toHaveBeenCalled()
    })

    it('should immediately (optimistically) create todo in the repo', () => {
      const todo: CreateTodoDto = {
        title: 'Buy Milk',
      }

      generatedUuid = 'uuid1'

      spectator.service.createTodo(todo)

      expect(spectator.inject(TodosRepository).addTodo).toHaveBeenCalledWith({
        uuid: generatedUuid,
        status: 'pending',
        ...todo,
      })
    })

    it('should update UUID and Todo in the repo once backend returns the created todo', () => {
      const todo: CreateTodoDto = {
        title: 'Buy Milk',
      }

      generatedUuid = 'uuid1'
      backendGeneratedUuid = 'backend-uuid-1'

      spectator.service.createTodo(todo).subscribe()

      expect(
        spectator.inject(TodosRepository).updateTodoUuid
      ).toHaveBeenCalledWith(generatedUuid, backendGeneratedUuid)

      expect(spectator.inject(TodosRepository).updateTodo).toHaveBeenCalledWith(
        backendGeneratedUuid,
        {
          uuid: backendGeneratedUuid,
          ...todo,
        }
      )
    })

    it('should delete todo in the repo in case if backend returns an error', () => {
      spectator.inject(TodosAdapterService).castToWritable().createTodo =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockObservable(() => throwError(() => new Error())) as any

      const todo: CreateTodoDto = {
        title: 'Buy Milk',
      }

      generatedUuid = 'uuid1'

      spectator.service.createTodo(todo).subscribe()

      expect(spectator.inject(TodosRepository).deleteTodo).toHaveBeenCalledWith(
        generatedUuid
      )
    })

    it('should re-throw error', (done) => {
      const error = new Error()

      spectator.inject(TodosAdapterService).castToWritable().createTodo =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockObservable(() => throwError(() => error)) as any

      const todo: CreateTodoDto = {
        title: 'Buy Milk',
      }

      generatedUuid = 'uuid1'

      spectator.service.createTodo(todo).subscribe({
        error: (err) => {
          expect(err).toEqual(error)
          done()
        },
      })
    })
  })

  describe('deleteTodo()', () => {
    it('should delete todo (optimistically) right away', () => {
      spectator.service.deleteTodo('uuid1')

      expect(spectator.inject(TodosRepository).deleteTodo).toHaveBeenCalledWith(
        'uuid1'
      )
    })

    it('should make request to the adapter', () => {
      spectator.service.deleteTodo('uuid1').subscribe()

      expect(
        spectator.inject(TodosAdapterService).deleteTodo
      ).toHaveBeenCalledWith('uuid1')
    })

    it('should revert changes in the local store in case of error', (done) => {
      spectator.inject(TodosAdapterService).castToWritable().deleteTodo =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockObservable(() => throwError(() => new Error())) as any

      const todo: Todo = {
        uuid: 'uuid1',
        title: 'Buy Milk',
        status: 'pending',
      }

      spectator.inject(TodosRepository).castToWritable().queryTodo = jest
        .fn()
        .mockReturnValue(todo)

      spectator.service.deleteTodo(todo.uuid).subscribe({
        error: () => {
          expect(
            spectator.inject(TodosRepository).addTodo
          ).toHaveBeenCalledWith(todo)
          done()
        },
      })
    })
  })
})
