import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest'
import { TodosMainUiStateService } from '../../services/todos-main-ui-state.service'
import { AboutComponent } from './about.component'

describe('AboutComponent', () => {
  let spectator: Spectator<AboutComponent>
  const createComponent = createComponentFactory({
    component: AboutComponent,
    providers: [mockProvider(TodosMainUiStateService)],
    shallow: true,
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  it('should hide controls on init', () => {
    spectator = createComponent()

    expect(
      spectator.inject(TodosMainUiStateService).hideControls
    ).toHaveBeenCalled()
  })

  it('should show controls on destroy', () => {
    spectator = createComponent()
    spectator.fixture.destroy()

    expect(
      spectator.inject(TodosMainUiStateService).showControls
    ).toHaveBeenCalled()
  })
})
