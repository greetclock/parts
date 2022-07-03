import {
  createComponentFactory,
  mockProvider,
  Spectator,
  byTestId,
} from '@ngneat/spectator/jest'
import { ControlsComponent } from './controls.component'
import { RxState } from '@rx-angular/state'

describe('ControlsComponent', () => {
  let spectator: Spectator<ControlsComponent>
  const createComponent = createComponentFactory({
    component: ControlsComponent,
    providers: [mockProvider(RxState)],
  })

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })

  it('should set addingNew UI state when the add-new button is clicked', () => {
    spectator = createComponent()
    spectator.click(byTestId('add-new'))
    spectator.detectChanges()

    expect(spectator.inject(RxState).set).toHaveBeenCalledWith({
      addingNew: true,
    })
  })
})
