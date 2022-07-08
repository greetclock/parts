import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { ControlButtonComponent } from './control-button.component'

describe('ControlButtonComponent', () => {
  let spectator: Spectator<ControlButtonComponent>
  const createComponent = createComponentFactory(ControlButtonComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
