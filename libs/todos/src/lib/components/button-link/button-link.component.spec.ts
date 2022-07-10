import { Spectator, createComponentFactory } from '@ngneat/spectator/jest'

import { ButtonLinkComponent } from './button-link.component'

describe('ButtonLinkComponent', () => {
  let spectator: Spectator<ButtonLinkComponent>
  const createComponent = createComponentFactory(ButtonLinkComponent)

  it('should create', () => {
    spectator = createComponent({
      props: {
        url: 'https://example.com',
      },
    })

    expect(spectator.component).toBeTruthy()
  })
})
