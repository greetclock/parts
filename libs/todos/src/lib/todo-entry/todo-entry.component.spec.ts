import { fakeAsync, tick } from '@angular/core/testing'
import {
  createComponentFactory,
  mockProvider,
  Spectator,
  byTestId,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import { EMPTY, Subject } from 'rxjs'
import { TodosMainUiStateService } from '../todos-main/todos-main-ui-state.service'
import { TodoEntryComponent } from './todo-entry.component'

describe('TodoEntryComponent', () => {
  const selectMock: (...args: any[]) => any = (selector) => {
    if (selector === 'expandedEntry') {
      return 'uuid2'
    } else {
      throw new Error(
        `TodoEntryComponent.selectMock: unsepecified selector ${selector}`
      )
    }
  }

  let spectator: Spectator<TodoEntryComponent>
  const createComponent = createComponentFactory({
    component: TodoEntryComponent,
    providers: [
      mockProvider(TodosFacadeService, {
        updateTodoStatus: mockObservable(() => EMPTY),
      }),
      mockProvider(TodosMainUiStateService, {
        state: {
          select: mockObservable((data) => selectMock(data)),
        },
      }),
    ],
  })

  let todo: Todo
  beforeEach(() => {
    todo = {
      uuid: 'uuid1',
      title: 'Hello',
      status: 'pending',
    }
  })

  it('should create', () => {
    spectator = createComponent({
      props: {
        todo,
      },
    })

    expect(spectator.component).toBeTruthy()
  })

  it('should throw error if props are not submitted', () => {
    expect(() => createComponent()).toThrow()
  })

  it('should send the updated status to the facade', () => {
    spectator = createComponent({
      props: {
        todo,
      },
    })

    spectator.component.checked(true)

    expect(
      spectator.inject(TodosFacadeService).updateTodoStatus
    ).toHaveBeenCalledWith('uuid1', 'done')
  })

  it('should expand entry on click', fakeAsync(() => {
    spectator = createComponent({
      props: {
        todo,
      },
    })

    spectator.click(byTestId('title'))
    tick()

    expect(
      spectator.inject(TodosMainUiStateService).expandEntry
    ).toHaveBeenCalledWith('uuid1')
  }))

  describe('save()', () => {
    it('should collapseEntry in the UI', () => {
      spectator = createComponent({
        props: {
          todo,
        },
      })

      spectator.component.save()

      expect(
        spectator.inject(TodosMainUiStateService).collapseEntry
      ).toHaveBeenCalledWith(todo.uuid)
    })

    it('should update todo using facade', () => {
      spectator = createComponent({
        props: {
          todo,
        },
      })

      spectator.component.save()

      expect(
        spectator.inject(TodosFacadeService).updateTodo
      ).toHaveBeenCalledWith(todo)
    })
  })

  describe('click outside', () => {
    function getOutsideClickSubject(): Subject<void> {
      return (spectator.component as any).outsideClicks$
    }

    it('should save component on the outside click', () => {
      spectator = createComponent({
        props: {
          todo,
        },
      })

      spectator.component.save = jest.fn().mockReturnValue(EMPTY)

      const outsideClick$ = getOutsideClickSubject()

      outsideClick$.next()

      expect(spectator.component.save).toHaveBeenCalled()
    })
  })
})
