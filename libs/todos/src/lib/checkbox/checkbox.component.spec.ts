import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { CheckboxComponent } from './checkbox.component'

describe('CheckboxComponent', () => {
  let spectator: Spectator<CheckboxComponent>
  const createComponent = createComponentFactory(CheckboxComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
