import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { TodosFacadeService } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
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
      TodosMainUiStateService,
    ],
    shallow: true,
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  describe('onSave()', () => {
    it('should disable adding new state instantly', () => {
      spectator = createComponent()

      spectator.component.onSave({ title: 'Buy Milk' })

      expect(spectator.inject(RxState).set).toHaveBeenCalledWith({
        addingNew: false,
      })
    })

    it('should create todo in the facade', () => {
      spectator = createComponent()

      spectator.component.onSave({ title: 'Buy Milk' })

      expect(
        spectator.inject(TodosFacadeService).createTodo
      ).toHaveBeenCalledWith({ title: 'Buy Milk' })
    })
  })
})
