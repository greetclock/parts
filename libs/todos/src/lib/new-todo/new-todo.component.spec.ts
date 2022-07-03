import { fakeAsync, tick, waitForAsync } from '@angular/core/testing'
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { TodosFacadeService } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { NewTodoComponent } from './new-todo.component'

describe('NewTodoComponent', () => {
  let spectator: Spectator<NewTodoComponent>
  const createComponent = createComponentFactory({
    component: NewTodoComponent,
    providers: [
      mockProvider(RxState),
      mockProvider(TodosFacadeService, {
        createTodo: mockObservable(() => void 0),
      }),
    ],
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  it('should submit data when saved', waitForAsync(() => {
    spectator = createComponent()

    spectator.component.title = 'Buy Milk'
    spectator.component.description = 'And eggs'

    spectator.component.save()

    expect(
      spectator.inject(TodosFacadeService).createTodo
    ).toHaveBeenCalledWith({
      title: 'Buy Milk',
      description: 'And eggs',
    })
  }))

  it('should disable addingNew state after successfull saving', fakeAsync(() => {
    spectator = createComponent()

    spectator.component.title = 'Buy Milk'
    spectator.component.description = 'And eggs'

    spectator.component.save()
    tick()

    expect(spectator.inject(RxState).set).toHaveBeenCalledWith({
      addingNew: false,
    })
  }))
})
