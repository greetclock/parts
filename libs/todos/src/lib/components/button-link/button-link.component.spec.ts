import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { ButtonLinkComponent } from './button-link.component'

describe('ButtonLinkComponent', () => {
  let spectator: Spectator<ButtonLinkComponent>
  const createComponent = createComponentFactory(ButtonLinkComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
