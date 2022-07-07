import {
  createComponentFactory,
  mockProvider,
  Spectator,
  byTestId,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { TodosFacadeService } from '@parts/todos/data'
import { EMPTY } from 'rxjs'
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

  it('should create', () => {
    spectator = createComponent({
      props: {
        todo: {
          uuid: 'uuid1',
          title: 'Hello',
          status: 'pending',
        },
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
        todo: {
          uuid: 'uuid1',
          title: 'Hello',
          status: 'pending',
        },
      },
    })

    spectator.component.checked(true)

    expect(
      spectator.inject(TodosFacadeService).updateTodoStatus
    ).toHaveBeenCalledWith('uuid1', 'done')
  })

  it('should expand entry on click', () => {
    spectator = createComponent({
      props: {
        todo: {
          uuid: 'uuid1',
          title: 'Hello',
          status: 'pending',
        },
      },
    })

    spectator.click(byTestId('title'))

    expect(
      spectator.inject(TodosMainUiStateService).expandEntry
    ).toHaveBeenCalledWith('uuid1')
  })
})
