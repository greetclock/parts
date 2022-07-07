import { fakeAsync, tick } from '@angular/core/testing'
import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { Todo, TodosFacadeService } from '@parts/todos/data'
import { EMPTY } from 'rxjs'
import { TodosMainUiStateService } from '../todos-main/todos-main-ui-state.service'
import { ViewTodoEntryComponent } from '../view-todo-entry/view-todo-entry.component'
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
    declarations: [ViewTodoEntryComponent],
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

    spectator.component.onChecked(true)

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
