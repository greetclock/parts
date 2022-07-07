import {
  Spectator,
  createComponentFactory,
  mockProvider,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { TodosFacadeService } from '@parts/todos/data'
import { EMPTY } from 'rxjs'

import { TodoEntryComponent } from './todo-entry.component'

describe('TodoEntryComponent', () => {
  let spectator: Spectator<TodoEntryComponent>
  const createComponent = createComponentFactory({
    component: TodoEntryComponent,
    providers: [
      mockProvider(TodosFacadeService, {
        updateTodoStatus: mockObservable(() => EMPTY),
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
})
