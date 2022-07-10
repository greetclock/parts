import { fakeAsync, tick } from '@angular/core/testing'
import { SpectatorService } from '@ngneat/spectator'
import { createServiceFactory, mockProvider } from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { v4 as getUuid } from 'uuid'
import { CreateTodoDto, TodosAdapterService } from './todos-adapter.service'
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
        createTodo: mockObservable((data: CreateTodoDto) => ({
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
          status: 'pending',
        },
        {
          uuid: 'uuid2',
          title: 'Code things',
          status: 'pending',
        },
      ]

      spectator = createService()

      spectator.service.getTodos().subscribe((todos) => {
        expect(todos).toEqual(todosList)
        done()
      })
    })

    it('should have todos loaded false by default', () => {
      spectator = createService()

      let todosLoaded: boolean | undefined
      spectator.service.todosLoaded$.subscribe(
        (loaded) => (todosLoaded = loaded)
      )

      expect(todosLoaded).toEqual(false)
    })

    it('should mark todos as loaded', fakeAsync(() => {
      todosList = [
        {
          uuid: 'uuid1',
          title: 'Buy milk',
          status: 'pending',
        },
        {
          uuid: 'uuid2',
          title: 'Code things',
          status: 'pending',
        },
      ]

      spectator = createService()
      spectator.service.getTodos()
      tick()

      let todosLoaded = false
      spectator.service.todosLoaded$.subscribe(
        (loaded) => (todosLoaded = loaded)
      )

      expect(todosLoaded).toEqual(true)
    }))
  })

  describe('getTodoByUuid()', () => {
    it('should return todo from the adapter', (done) => {
      todoByUuid = {
        uuid: 'uuid1',
        title: 'Buy milk',
        status: 'pending',
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

      const todoDto: CreateTodoDto = {
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
        status: 'pending',
        title: 'Buy Milk',
      }

      spectator.service.updateTodo(todo).subscribe((updatedTodo) => {
        expect(updatedTodo).toEqual(todo)
        done()
      })
    })
  })
})
