import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { TodosFacadeService } from '@parts/todos/data'
import { RxState } from '@rx-angular/state'
import { EMPTY } from 'rxjs'
import { TodosMainUiStateService } from '../todos-main/todos-main-ui-state.service'
import { TodayComponent } from './today.component'

describe('TodayComponent', () => {
  let spectator: Spectator<TodayComponent>
  const createComponent = createComponentFactory({
    component: TodayComponent,
    providers: [
      mockProvider(RxState),
      mockProvider(TodosFacadeService, {
        createTodo: mockObservable(() => EMPTY),
        getTodos: mockObservable(() => EMPTY),
      }),
      TodosMainUiStateService,
    ],
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
