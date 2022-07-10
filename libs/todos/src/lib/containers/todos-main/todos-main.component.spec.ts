import { Overlay } from '@angular/cdk/overlay'
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { TodosFacadeService } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { EMPTY } from 'rxjs'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
import { TodosMainComponent } from './todos-main.component'

describe('TodosMainComponent', () => {
  let spectator: Spectator<TodosMainComponent>
  const createComponent = createComponentFactory({
    component: TodosMainComponent,
    providers: [
      mockProvider(RxState),
      mockProvider(TodosFacadeService, {
        createTodo: mockObservable(() => EMPTY),
        getTodos: mockObservable(() => EMPTY),
      }),
      TodosMainUiStateService,
      mockProvider(Overlay),
    ],
    shallow: true,
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  it('should request todos on init', () => {
    spectator = createComponent()

    expect(spectator.inject(TodosFacadeService).getTodos).toHaveBeenCalled()
  })
})
