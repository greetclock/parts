import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { mockObservable } from '@parts/test-helpers'
import { TodosFacadeService } from '@parts/todos/data'
import { EMPTY } from 'rxjs'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
import { ControlsComponent } from './controls.component'

describe('ControlsComponent', () => {
  let spectator: Spectator<ControlsComponent>
  const createComponent = createComponentFactory({
    component: ControlsComponent,
    providers: [
      mockProvider(TodosMainUiStateService, {
        isTodoExpanded$: EMPTY,
        state: {
          select: mockObservable(() => EMPTY),
        },
      }),
      mockProvider(TodosFacadeService),
    ],
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  it('should set addingNew UI state when the add-new button is clicked', () => {
    spectator = createComponent()

    spectator.component.addNew()

    expect(
      spectator.inject(TodosMainUiStateService).setAddingNew
    ).toHaveBeenCalledWith(true)
  })
})
