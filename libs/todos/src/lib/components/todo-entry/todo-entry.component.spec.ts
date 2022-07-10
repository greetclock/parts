import { fakeAsync, tick } from '@angular/core/testing'
import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import { EMPTY, NEVER } from 'rxjs'
import { CHECKED_DELAY } from '../../services/todo-checked-timer.service'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
import { ViewTodoEntryComponent } from '../view-todo-entry/view-todo-entry.component'
import { TodoEntryComponent } from './todo-entry.component'

describe('TodoEntryComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    declarations: [ViewTodoEntryComponent],
    shallow: true,
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

  describe('onChecked()', () => {
    it('should send the updated status to the facade after 2 seconds', fakeAsync(() => {
      spectator = createComponent({
        props: {
          todo,
        },
      })

      const updateTodosStatus =
        spectator.inject(TodosFacadeService).updateTodoStatus

      spectator.component.onChecked(true)
      expect(updateTodosStatus).not.toHaveBeenCalled()
      tick(CHECKED_DELAY)

      expect(updateTodosStatus).toHaveBeenCalledWith('uuid1', 'done')
    }))

    it('should update todo status if it was destroyed after being checked', fakeAsync(() => {
      spectator = createComponent({
        props: {
          todo,
        },
      })

      spectator.inject(TodosFacadeService).castToWritable().updateTodoStatus =
        jest.fn().mockReturnValue(NEVER)

      const updateTodosStatus =
        spectator.inject(TodosFacadeService).updateTodoStatus

      spectator.component.onChecked(true)
      expect(updateTodosStatus).not.toHaveBeenCalled()

      spectator.fixture.destroy()
      expect(updateTodosStatus).toHaveBeenCalledWith('uuid1', 'done')
    }))
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

  describe('onSave()', () => {
    it('should disable adding new state instantly', () => {
      spectator = createComponent({
        props: {
          todo,
        },
      })

      spectator.component.onSave({ title: 'Buy Eggs', status: 'done' })

      expect(
        spectator.inject(TodosMainUiStateService).collapseEntry
      ).toHaveBeenCalledWith(todo.uuid)
    })

    it('should create todo in the facade', () => {
      spectator = createComponent({
        props: {
          todo,
        },
      })

      spectator.component.onSave({ title: 'Buy Eggs', status: 'done' })

      expect(
        spectator.inject(TodosFacadeService).updateTodo
      ).toHaveBeenCalledWith({
        title: 'Buy Eggs',
        status: 'done',
        uuid: todo.uuid,
      })
    })
  })
})
