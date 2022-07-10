import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { TodosFacadeService } from '@parts/todos/data'
import { EMPTY } from 'rxjs'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
import { LogbookComponent } from './logbook.component'

describe('LogbookComponent', () => {
  let spectator: Spectator<LogbookComponent>
  const createComponent = createComponentFactory({
    component: LogbookComponent,
    providers: [
      mockProvider(TodosFacadeService, {
        doneTodos$: EMPTY,
        todosLoaded$: EMPTY,
      }),
      mockProvider(TodosMainUiStateService),
    ],
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  it('should mark that logbook was opened', () => {
    spectator = createComponent()

    expect(
      spectator.inject(TodosMainUiStateService).logbookOpened
    ).toHaveBeenCalledWith(true)
  })

  it('should mark that logbook was closed', () => {
    spectator = createComponent()

    spectator.fixture.destroy()

    expect(
      spectator.inject(TodosMainUiStateService).logbookOpened
    ).toHaveBeenCalledTimes(2)

    expect(
      spectator.inject(TodosMainUiStateService).logbookOpened
    ).toHaveBeenCalledWith(false)
  })
})
