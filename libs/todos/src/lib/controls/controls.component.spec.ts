import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import { ControlsComponent } from './controls.component'

describe('ControlsComponent', () => {
  let spectator: Spectator<ControlsComponent>
  const createComponent = createComponentFactory(ControlsComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
